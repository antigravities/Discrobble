// ==UserScript==
// @name         Discrobble
// @namespace    https://alexandra.moe/
// @version      0.2
// @description  "Scrobble" your current Google Play Music song title and artist to Discord using Rich Presence.
// @author       antigravities
// @match        https://play.google.com/music/listen*
// @grant        GM_xmlHttpRequest
// @require      https://alexandra.moe/discord.min.js?11.2.1
// ==/UserScript==

(function() {
    'use strict';

    var discordToken = ""; // your Discord token
    // Discord app ID, go to https://discordapp.com/developers/applications/me, create a new app, enable Rich Presence, and copy the "client ID" here
    var discordappId = "";

    var discord = new Discord.Client();

    var scrobbleText = "standard";

    discord.on("ready", function(){
        setInterval(function(){
            var toScrobble = "";
            if( document.getElementById("player-artist") === null || document.getElementById("playerSongInfo").style.display === "none" ) toScrobble = "";
            else toScrobble = document.getElementById("player-artist").innerText.trim() + " - " + document.getElementById("currently-playing-title").innerText.trim();

            if( toScrobble == scrobbleText ) return;

            if( toScrobble === "" ){
                discord.user.setPresence({status: 'online', game: null });
                scrobbleText = "";
                return;
            }

            discord.user.setPresence({ game: { name: "🎵🎧🎵", details: toScrobble.split(" - ")[0], state: toScrobble.split(" - ")[1], type: 0, application_id: discordappId } });
            scrobbleText = toScrobble;
        }, 1000);
    });

    discord.login(discordToken);
})();
