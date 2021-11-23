import Component from "../../database/models/component";

const getComponents = async (req, res) => {
  const components = await Component.find();
  res.json(components);
};

export default getComponents;
