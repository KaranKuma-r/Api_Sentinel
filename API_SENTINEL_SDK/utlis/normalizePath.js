function normalizePath(path) {
  return path
    .replace(/\/\d+/g, "/:id")
    .replace(/\/[a-f0-9]{24}/g, "/:id")
}

module.exports = normalizePath
