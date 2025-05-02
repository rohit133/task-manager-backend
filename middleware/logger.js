module.exports.logger = (req, res, next) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: true });
    console.log(`[${formattedDate}] ${req.method} request to ${req.url}`);
    next();
}