export default function getShortForm(text) {
	if (text == "NS") {
		return "NS";
	} else if (text == "LIVE") {
		return "LIVE";
	} else if (text == "HT") {
		return "HT";
	} else if (text == "FT") {
		return "FT";
	} else if (text == "ET") {
		return "ET";
	} else if (text == "FT_PEN") {
		return "FTP";
	} else if (text == "PEN_LIVE") {
		return "PEN";
	} else if (text == "AET") {
		return "AET";
	} else if (text == "BREAK") {
		return "BR";
	} else if (text == "CANCL") {
		return "CA";
	} else if (text == "POSTP") {
		return "PP";
	} else if (text == "TBA") {
		return "TBA";
	} else if (text == "DELAYED") {
		return "DL";
	} else if (text == "AU") {
		return "AU";
	} else if (text == "AWARDED") {
		return "AW";
	} else if (text == "Deleted") {
		return "DE";
	} else {
		return text;
	}
}
