const re = new RegExp("\\w*#[0-9]{4}", "g")

module.exports = (string) => {
  return string.match(re)
}
