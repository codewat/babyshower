/**
 * GOOGLE APPS SCRIPT FOR ONIN & CHARLENE'S BABY SHOWER
 * Handles:
 * 1. RSVPs (tab: "RSVPs")
 * 2. Guestbook Wishes (tab: "Guestbook")
 * 3. Registry Reservations (tab: "Registry Claims")
 * 4. Baby Name Predictions (tab: "Name Predictions")
 * 5. Resemblance Poll Votes (tab: "Poll Votes")
 * 
 * Also serves live data via doGet() for 2-way real-time syncing!
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Fetch Wishes from "Guestbook"
    var wishes = [];
    var wishSheet = ss.getSheetByName("Guestbook");
    if (wishSheet && wishSheet.getLastRow() > 1) {
      var wishRows = wishSheet.getRange(2, 1, wishSheet.getLastRow() - 1, 4).getValues();
      for (var i = 0; i < wishRows.length; i++) {
        var r = wishRows[i];
        var rawDate = r[0];
        var name = r[1] ? String(r[1]).trim() : "";
        var rel = r[2] ? String(r[2]).trim() : "Guest";
        var msg = r[3] ? String(r[3]).trim() : "";

        if (name && msg) {
          wishes.push({
            date: formatDateOnly(rawDate),
            name: name,
            relationship: rel,
            message: msg
          });
        }
      }
      wishes.reverse(); // Newest first
    }

    // 2. Fetch Name Predictions from "Name Predictions"
    var predictions = [];
    var predSheet = ss.getSheetByName("Name Predictions");
    if (predSheet && predSheet.getLastRow() > 1) {
      var predRows = predSheet.getRange(2, 1, predSheet.getLastRow() - 1, 3).getValues();
      for (var j = 0; j < predRows.length; j++) {
        var pr = predRows[j];
        var rawPredDate = pr[0];
        var guesser = pr[1] ? String(pr[1]).trim() : "";
        var nameGuess = pr[2] ? String(pr[2]).trim() : "";

        if (guesser && nameGuess) {
          predictions.push({
            date: formatDateOnly(rawPredDate),
            guesser: guesser,
            nameGuess: nameGuess
          });
        }
      }
      predictions.reverse(); // Newest first
    }

    // 3. Fetch Poll Votes from "Poll Votes"
    var pollCounts = { daddy: 0, mommy: 0 };
    var pollSheet = ss.getSheetByName("Poll Votes");
    if (pollSheet && pollSheet.getLastRow() > 1) {
      var pollRows = pollSheet.getRange(2, 2, pollSheet.getLastRow() - 1, 1).getValues();
      for (var k = 0; k < pollRows.length; k++) {
        var choice = String(pollRows[k][0] || "").toLowerCase();
        if (choice.indexOf("daddy") !== -1) {
          pollCounts.daddy++;
        } else if (choice.indexOf("mommy") !== -1) {
          pollCounts.mommy++;
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      wishes: wishes,
      predictions: predictions,
      poll: pollCounts
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: error.toString(),
      wishes: [],
      predictions: [],
      poll: { daddy: 0, mommy: 0 }
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = {};
    
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    var type = data.type || "rsvp";

    // 1. FOR RSVP SUBMISSIONS
    if (type === "rsvp") {
      var rsvpSheet = ss.getSheetByName("RSVPs");
      if (!rsvpSheet) {
        rsvpSheet = ss.insertSheet("RSVPs");
      }
      if (rsvpSheet.getLastRow() === 0) {
        rsvpSheet.appendRow([
          "Timestamp",
          "Name",
          "Attending",
          "Total Guests",
          "Additional Guests",
          "Contact / Phone",
          "Dietary Restrictions",
          "Message"
        ]);
        rsvpSheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#e2e8f0");
      }

      var attendingText = (data.attendance === "yes") ? "Yes (Attending)" : "No (Declined)";
      var additionalGuestsText = Array.isArray(data.additionalGuests) 
        ? data.additionalGuests.filter(function(g) { return g && g.trim(); }).join(", ")
        : (data.additionalGuests || "None");

      rsvpSheet.appendRow([
        timestamp,
        data.name || "",
        attendingText,
        data.totalCount || 1,
        additionalGuestsText || "None",
        data.contact || "",
        data.dietary || "None",
        data.message || ""
      ]);

      // If naay message ang RSVP, idiretso pud sa Guestbook tab
      if (data.message && data.message.trim() !== "") {
        saveWish(ss, timestamp, data.name, (data.attendance === "yes" ? "Attending Guest" : "Sending Love"), data.message);
      }

    // 2. FOR GUESTBOOK WISHES
    } else if (type === "wish") {
      saveWish(ss, timestamp, data.name, data.relationship, data.message);

    // 3. FOR REGISTRY RESERVATIONS
    } else if (type === "claim") {
      var claimSheet = ss.getSheetByName("Registry Claims");
      if (!claimSheet) {
        claimSheet = ss.insertSheet("Registry Claims");
      }
      if (claimSheet.getLastRow() === 0) {
        claimSheet.appendRow([
          "Timestamp",
          "Item Name",
          "Reserved By",
          "Note"
        ]);
        claimSheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#e2e8f0");
      }
      claimSheet.appendRow([
        timestamp,
        data.itemName || data.itemId || "",
        data.claimerName || "",
        data.claimerNote || ""
      ]);

    // 4. FOR BABY NAME PREDICTIONS
    } else if (type === "prediction") {
      var predSheet = ss.getSheetByName("Name Predictions");
      if (!predSheet) {
        predSheet = ss.insertSheet("Name Predictions");
      }
      if (predSheet.getLastRow() === 0) {
        predSheet.appendRow([
          "Timestamp",
          "Guesser Name",
          "Baby Name Guess"
        ]);
        predSheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#e2e8f0");
      }
      predSheet.appendRow([
        timestamp,
        data.guesser || "Anonymous",
        data.nameGuess || ""
      ]);

    // 5. FOR RESEMBLANCE POLL VOTES
    } else if (type === "poll_vote") {
      var pollSheet = ss.getSheetByName("Poll Votes");
      if (!pollSheet) {
        pollSheet = ss.insertSheet("Poll Votes");
      }
      if (pollSheet.getLastRow() === 0) {
        pollSheet.appendRow([
          "Timestamp",
          "Vote Choice"
        ]);
        pollSheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#e2e8f0");
      }
      pollSheet.appendRow([
        timestamp,
        data.choice || "Daddy Onin"
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function saveWish(ss, timestamp, name, relationship, message) {
  var wishSheet = ss.getSheetByName("Guestbook");
  if (!wishSheet) {
    wishSheet = ss.insertSheet("Guestbook");
  }
  if (wishSheet.getLastRow() === 0) {
    wishSheet.appendRow(["Timestamp", "Name", "Relationship", "Message"]);
    wishSheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#e2e8f0");
  }
  wishSheet.appendRow([
    timestamp,
    name || "Anonymous",
    relationship || "Guest",
    message || ""
  ]);
}

function formatDateOnly(rawDate) {
  if (!rawDate) return "";
  try {
    if (rawDate instanceof Date) {
      return Utilities.formatDate(rawDate, Session.getScriptTimeZone() || "GMT", "yyyy-MM-dd");
    } else {
      return String(rawDate).split("T")[0] || "";
    }
  } catch (err) {
    return "";
  }
}

