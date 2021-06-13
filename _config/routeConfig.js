module.exports = (routes) => {
  let parseRoute = [];

  let titleV = "";
  let projectNameV = "";
  const parseRouteFn = (list) => {
    list.forEach(({ category, title, name, projectName }) => {
      if (!!category) {
        projectNameV = projectName;
        titleV = title;
        parseRouteFn(category);
        return;
      }

      parseRoute.push({
        title: !!title ? title : titleV,
        name: !name ? projectName : name,
        projectName: projectName ? projectName : projectNameV,
      });
    });
  };

  parseRouteFn(routes);

  return parseRoute;
};
