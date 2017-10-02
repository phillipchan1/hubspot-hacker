module.exports = {
	newContact(vid, props) {
		return {
			"vid": vid.toString(),
			"properties": props
		};
	}
};