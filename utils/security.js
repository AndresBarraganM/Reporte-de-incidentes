import bcryptjs from "bcryptjs";

const compararPassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

const hashPassword = async (password) => {
    return await bcryptjs.hash(password, 10)
}

export { compararPassword, hashPassword };