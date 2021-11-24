import Component from "../../database/models/component";

const getComponents = async (req, res, next) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    error.message = "Can't find the components";
    error.code = 400;
    next(error);
  }
};

export default getComponents;
