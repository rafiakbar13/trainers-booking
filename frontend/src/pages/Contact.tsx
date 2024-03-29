const Contact = () => {
  return (
    <section className="mt-20">
      <div className="max-w-screen-md px-4 py-10 mx-auto">
        <h2 className="text-5xl font-semibold text-center">Contact Us</h2>
        <p className="mb-8 text-center lg:mb-16 text-[18px] leading-[30px] font-[400] text-textColor mt-[18px]">
          Got a technical issue? want to send feedback about a beta feature
        </p>
        <form action="" className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="font-semibold text-[16px] leading-7 mb-2l"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              className="mt-1 w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-secondary-400 font-[400] focus:outline-none focus:border-secondary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="font-semibold text-[16px] leading-7 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Let us know how we can help you"
              className="mt-1 w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-secondary-400 font-[400] focus:outline-none focus:border-secondary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="font-semibold text-[16px] leading-7 mb-2"
            >
              Your Message
            </label>
            <textarea
              rows={6}
              name="message"
              id="message"
              placeholder="Leave a comment..."
              className="mt-1 w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-secondary-400 font-[400] focus:outline-none focus:border-secondary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="rounded py-[15px] px-[35px]  text-white font-[600] mt-[38px] sm:w-full bg-gray-500"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
