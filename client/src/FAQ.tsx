export const FAQ = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h2 className="text-4xl font-bold">Frequently Asked Questions:</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-medium">What is Business Reviews?</h3>
        <p>
          Business Reviews is an online platform designed to facilitate the
          sharing of experiences and opinions about various businesses. It
          serves as a community-driven hub where users can read and write
          reviews to help others make informed decisions about where to shop,
          dine, or seek services.
        </p>

        <h3 className="text-xl font-medium">How does it work?</h3>
        <p>
          Businesses are listed on the platform, categorized by industry and
          location. Users can browse through the listings to find businesses
          they're interested in. Each business page provides details such as
          name, description, location, and reviews.
        </p>
        <p>
          To submit a review, users must first register an account and log in.
          Once logged in, they can access the review submission form either
          directly from the business page or through the navigation bar. From
          the submission form, users can rate the business, write their review,
          and submit their feedback.
        </p>

        <h3 className="text-xl font-medium">
          What features does Business Reviews offer?
        </h3>
        <ul className="space-y-2">
          <li className="font-medium">
            <strong>Business Listings:</strong> Users can browse through a
            comprehensive list of businesses, organized by industry and
            location.
          </li>
          <li className="font-medium">
            <strong>Review Submission:</strong> Registered users can submit
            reviews for businesses they've interacted with, providing ratings
            and detailed feedback.
          </li>
          <li className="font-medium">
            <strong>User Authentication:</strong> Secure registration and login
            functionality allow users to create accounts, manage their profiles,
            and interact with the platform.
          </li>
          <li className="font-medium">
            <strong>Review Display:</strong> Reviews are prominently displayed
            on each business's page, showcasing overall ratings and individual
            user testimonials.
          </li>
        </ul>

        <h3 className="text-xl font-medium">How are reviews displayed?</h3>
        <p>
          Reviews are displayed on each business's dedicated page, alongside
          essential information about the business itself. The overall rating,
          calculated based on all user reviews, is prominently featured to give
          users a quick overview of the business's reputation. Individual
          reviews are listed below, providing detailed feedback and insights
          from other users.
        </p>

        <h3 className="text-xl font-medium">
          Can I register and leave reviews?
        </h3>
        <p>
          Yes, absolutely! Business Reviews encourages user participation and
          values diverse perspectives. To leave reviews, users need to register
          for an account and log in. Once registered and logged in, users can
          freely browse businesses, submit reviews, and engage with the
          community.
        </p>

        <h3 className="text-xl font-medium">Is my data secure?</h3>
        <p>
          Yes, protecting your data is a top priority at Business Reviews. We
          employ industry-standard security measures, including encryption and
          secure authentication protocols, to safeguard your personal
          information. Additionally, we adhere to strict privacy policies and do
          not share your data with third parties without your consent. Your
          trust and privacy are paramount to us.
        </p>
      </div>
    </div>
  );
};
