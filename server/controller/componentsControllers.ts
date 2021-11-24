import Component from "../../database/models/component";

export const getComponents = async (req, res, next) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    error.message = "Can't find the components";
    error.code = 400;
    next(error);
  }
};

export const getComponentById = async (req, res, next) => {
  const { idComponent } = req.params;
  try {
    const searchedComponent = await Component.findById(idComponent);
    if (searchedComponent) {
      res.json(searchedComponent);
    } else {
      const error: any = new Error("Component not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};
