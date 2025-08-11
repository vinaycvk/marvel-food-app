

const verifyRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `${req.user.role}s are not allowed to update` });
        }
        next();
    };
}


const verifyCountry = (req, res, next) => {
    req.country = req.user.country;
    next();
}

// const verifyCountry = (country) => {
//     return (req, res, next) => {
//         if (req.user.country !== country) {
//             return res.status(403).json({ message: 'Forbidden' });
//         }
//         next();
//     };
// }

export { verifyRoles, verifyCountry };