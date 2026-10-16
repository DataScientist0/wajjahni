"""
Wajjahni: make natural-sounding audio of every place name (Arabic + English)
with Microsoft Azure's neural text-to-speech.

The website plays these files when someone presses 🔊 Listen:
    audio/ar/<place_id>.mp3   and   audio/en/<place_id>.mp3
(place_id = the place's position in data.js + 1). Places without a file fall back to the device's voice.

How to run (from the wajjahni folder):
    1. Put your Azure Speech key and region in the terminal (never in a file or in chat):
           export AZURE_SPEECH_KEY="your-key"
           export AZURE_SPEECH_REGION="your-region"      # e.g. uaenorth, westeurope
    2. python3 scripts/make_audio.py
Re-run it any time names change. Existing files are skipped; use --force to remake them all.
"""
import json, os, sys, time, html, urllib.request

VOICES = {
    "ar": ("ar-SA", "ar-SA-ZariyahNeural"),   # Saudi Arabic, female. Male: ar-SA-HamedNeural
    "en": ("en-US", "en-US-JennyNeural"),     # US English, female. Male: en-US-GuyNeural
}

key = os.environ.get("AZURE_SPEECH_KEY")
region = os.environ.get("AZURE_SPEECH_REGION")
if not key or not region:
    sys.exit("Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION first (see the top of this file).")
force = "--force" in sys.argv

# Read the places from data.js (it's a JavaScript file that starts with "const DATA = [")
text = open("data.js", encoding="utf8").read()
places = json.loads(text[text.index("["): text.rindex("]") + 1])

url = f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1"
made = skipped = 0
for lang, (locale, voice) in VOICES.items():
    os.makedirs(f"audio/{lang}", exist_ok=True)
    for i, p in enumerate(places, start=1):
        out = f"audio/{lang}/{i}.mp3"
        if os.path.exists(out) and not force:
            skipped += 1
            continue
        name = p["place_name_ar"] if lang == "ar" else p["place_name"]
        # SSML: tells Azure which voice to use; prosody rate slows it down a little
        ssml = (f"<speak version='1.0' xml:lang='{locale}'><voice name='{voice}'>"
                f"<prosody rate='-5%'>{html.escape(name)}</prosody></voice></speak>")
        req = urllib.request.Request(url, data=ssml.encode("utf8"), headers={
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
            "User-Agent": "wajjahni-audio",
        })
        with urllib.request.urlopen(req) as r, open(out, "wb") as f:
            f.write(r.read())
        made += 1
        print(f"{out}  {name}")
        time.sleep(0.2)   # be gentle with the free tier

print(f"Done: {made} made, {skipped} already there.")
