class Apifeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const querycopy = { ...this.querystr }; // cant use querycopy=this.querystr cuz of reference change in copy will reflect in actual query

    const removefields = ["keyword", "page", "limit"];

    removefields.forEach((key) => delete querycopy[key]);

    //filter for price and rating

    let querystr = JSON.stringify(querycopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(querystr));

    return this;
  }

  panigation(resultperpage) {
    const currpage = Number(this.querystr.page) || 1;

    const skip = resultperpage * (currpage - 1);

    this.query = this.query.limit(resultperpage).skip(skip);

    return this;
  }
}

module.exports = Apifeatures;
