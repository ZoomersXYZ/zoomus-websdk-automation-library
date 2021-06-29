use AppleScript version "2.4" -- Yosemite (10.10) or later
use scripting additions

activate application "Google Chrome Beta"
delay 2
tell application "System Events" to keystroke 0 using command down
repeat 3 times
	delay 1.5
	tell application "System Events" to keystroke "-" using command down
end repeat