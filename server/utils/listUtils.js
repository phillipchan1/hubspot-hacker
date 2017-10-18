module.exports = {
	isNotEmpty(list) {
		if (list) {
			return (list.length > 0);
		} else {
			return false;
		}
	},
	isJSON(m) {

		if (typeof m == 'object') {
			try {
				m = JSON.stringify(m);
			}

			catch(err) {
				return false;
			}
		}

		if (typeof m == 'string') {
			try {
				m = JSON.parse(m);
			}

			catch (err) {
				return false;
			}
		}

		if (typeof m != 'object') {
			return false;
		}

		return true;
	}
};