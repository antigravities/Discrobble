// ==UserScript==
// @name         Discrobble
// @namespace    https://alexandra.moe/
// @version      0.1
// @description  "Scrobble" your current Google Play Music song title and artist to Discord.
// @author       antigravities
// @match        https://play.google.com/music/listen*
// @grant        GM_xmlHttpRequest
// @require      https://cdn.rawgit.com/izy521/discord.io/875dc8c21c34dac01a9b6c97119e3ffb20de1c21/lib/index.js
// ==/UserScript==

(function() {
    'use strict';

    var discordToken = ""; // your Discord token
    var streamURL = "https://twitch.tv/antigravities"; // if you want to show as "streaming", set to a twitch URL

    var discord = new Discord.Client({token: discordToken, autorun: true });

    var scrobbleText = "standard";

    discord.on("ready", function(){
        setInterval(function(){
            var toScrobble = "";
            if( document.getElementById("player-artist") === null || document.getElementById("playerSongInfo").style.display === "none" ) toScrobble = "";
            else toScrobble = "🎵 " + document.getElementById("player-artist").innerText.trim() + " - " + document.getElementById("currently-playing-title").innerText.trim();

            if( toScrobble == scrobbleText ) return;

            if( toScrobble === "" ){
                discord.setPresence({status: 'online', game: { name: ".", type: 0 } });
                scrobbleText = "";
                return;
            }

            discord.setPresence({ game: { name: toScrobble, type: 1, url: "https://twitch.tv/antigravities" } });
            scrobbleText = toScrobble;
        }, 1000);

        window.addEventListener("onBeforeUnload", function(){
            discord.setPresence({status: 'online', game: { name: ".", type: 0 } });
            discord.disconnect();
        });
    });
})();
