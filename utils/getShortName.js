export default function getShortName(name, short = null) {
	const wordCount = name.split(" ").length;
	if (wordCount == 1) {
		return name;
	} else if (wordCount == 2) {
		let words = name.split(" ");
		let firstLetter = words[0][0];
		return `${firstLetter}. ${words[1]}`;
	} else {
		if (short === null || name === short) {
			let words = name.split(" ");
			let firstLetter = words[0][0];
			return `${firstLetter}. ${words[words.length - 1]}`;
		} else {
			return short;
		}
	}
}
