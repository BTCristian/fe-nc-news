export default function ErrorPage({ err }) {
  if (err) {
    let statuscode = err.request.status;
    console.log(err);
    if (statuscode === 400) {
      return (
        <section className="badRequest">
          <h3>Bad request</h3>
          <img
            className="badReqImg"
            src="https://www.eurovps.com/blog/wp-content/uploads/2017/12/69-http-errors-guide-400-hero.jpg"
            alt="Bad request"
          />
        </section>
      );
    }
  }

  return (
    <section className="errorPage">
      <img
        className="notfoundImg"
        src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
        alt="Page not found"
      />
    </section>
  );
}
