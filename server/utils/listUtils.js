module.exports = {
	isNotEmpty(list) {
		if (list) {
			return (list.length > 0);
		} else {
			return false;
		}
	}
};