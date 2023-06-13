export default function getDateRange(date = null) {
	if (date) {
		var date1 = new Date(date);
		var date2 = new Date(date);
	} else {
		var date1 = new Date();
		var date2 = new Date();
	}

	const startDate = date1.setDate(date1.getDate() - 4);
	const endDate = date2.setDate(date2.getDate() + 4);
	const daylist = getDaysArray(startDate, endDate);
	const dateRangeArr = daylist.map((v) => v.toISOString().slice(0, 10));
	return dateRangeArr;
}

const getDaysArray = (start, end) => {
	for (
		var arr = [], dt = new Date(start);
		dt <= new Date(end);
		dt.setDate(dt.getDate() + 1)
	) {
		arr.push(new Date(dt));
	}
	return arr;
};
