import { USER, ADMIN } from "../constants/index.js";

const ROLES = {
  User: USER,
  Admin: ADMIN,
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user && !req?.roles) {
      res.status(401);
      throw new Error("You are not authorizied to use our platform");
    }

    const rolesArray = [...allowedRoles];
    const isRoleFound = req.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);

    if (!isRoleFound) {
      res.status(401);
      throw new Error("You are not authorizied to perform this request");
    }

    next();
  };
};

const role = { ROLES, checkRole };

export default role;
