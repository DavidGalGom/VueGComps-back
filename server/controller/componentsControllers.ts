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

export const addComponent = async (req, res, next) => {
  try {
    const component = req.body;
    const { fileURL } = req.file;
    const newComponent = await Component.create({
      ...component,
      mainImage: fileURL,
    });
    res.status(201).json(newComponent);
  } catch (error) {
    error.code = 400;
    error.message = "Bad request";
    next(error);
  }
};

export const deleteComponent = async (req, res, next) => {
  const { idComponent } = req.params;
  try {
    const deletedComponent = await Component.findByIdAndDelete(idComponent);
    if (deletedComponent) {
      res.json({ id: deletedComponent.id });
    } else {
      const error: any = new Error("Component not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Bad Request!";
    next(error);
  }
};

export const updateComponent = async (req, res, next) => {
  const component = req.body;
  const { fileURL } = req.file;
  const { idComponent } = req.params;
  try {
    const updatedComponent = await Component.findByIdAndUpdate(
      idComponent,
      { ...component, mainImage: fileURL },
      { new: true }
    );
    if (updatedComponent) {
      res.json(updatedComponent);
    } else {
      const error: any = new Error("Component not found");
      error.code = 404;
      next(error);
    }
  } catch {
    const error: any = new Error("Wrong format");
    error.code = 400;
    next(error);
  }
};
