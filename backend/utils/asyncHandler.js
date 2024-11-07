const asyncHandler = (requestHandler) => {
	return (req, res) => {
		Promise.resolve(requestHandler(req, res)).catch((error) => {
			console.log("ERROR IS: ", error);
		});
	};
};

export { asyncHandler };
