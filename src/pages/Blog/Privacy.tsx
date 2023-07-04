import { type NextPage } from "next";
import Head from "next/head";
import { Content, Layout } from "~/Components/Components";
const Privacy: NextPage = () => {
  const sections = [
    {
      title:
        "Your Privacy Matters to Us: A Closer Look at VidChill 's Privacy Policy",
      content:
        "The digital age is a thrilling and fast-paced epoch, filled with opportunities and challenges alike. But one thing that remains constant in this dynamic sphere is our commitment to your privacy. We at VidChill  understand the significance of your privacy and endeavor to respect and uphold it at every level of our interaction. This blog post is intended to explain our privacy policy in simple terms, acknowledging the necessity to adapt and strengthen our commitment to privacy in the changing digital landscape. VidChill  is designed as a platform for sharing and viewing videos, and we believe that such a service should come with robust privacy protections.",
    },
    {
      title: "What Information Does VidChill  Collect?",
      content:
        "As an interactive video sharing platform, VidChill  gathers data to provide, improve, and secure our services. The types of information we collect include:\n\n- Account details: When you create a VidChill  account, we collect information like your name, email address, and phone number.\n\n- Usage data: We record data about your activities on VidChill , like the videos you watch, your interactions with our services, and your usage of features.\n\n- Device information: We collect data about your devices, such as the hardware, operating system, IP address, and browser type.",
    },
    {
      title: "How Does VidChill  Use this Information?",
      content:
        "The data we collect helps us understand how users engage with our platform. We use this information to:\n\n- Improve and personalize your experience: We analyze user behaviors to offer personalized video recommendations and create features that resonate with your interests.\n\n- Maintain and improve our services: Understanding user behavior helps us identify and rectify glitches, optimize our platform, and plan future enhancements.\n\n- Communicate with you: We use your contact information to send notifications, updates, promotional messages, and to respond to your inquiries.",
    },
    {
      title: "With Whom Does VidChill  Share Your Information?",
      content:
        "VidChill  is committed to protecting your privacy and keeping your data secure. We do not sell or rent your personal data to third parties for their marketing purposes. We share your data in the following circumstances:\n\n- With your consent: We will share your personal information with companies, organizations, or individuals outside VidChill  only when we have your consent to do so.\n\n- For external processing: We provide personal information to our affiliates or other trusted businesses or persons to process it for us, based on our instructions and in compliance with our privacy policy and any other appropriate confidentiality and security measures.",
    },
    {
      title: "How Does VidChill  Protect Your Information?",
      content:
        "VidChill  implements stringent security measures to prevent unauthorized access, alteration, disclosure, or destruction of your information. These include data encryption, secure server networks, and regular security audits. Additionally, we conduct privacy training for our staff to ensure they handle your information responsibly.",
    },
    {
      title: "How Can You Control Your Information on VidChill ?",
      content:
        "Your privacy controls allow you to:\n\n- Manage your VidChill  account information and settings\n\n- Control who can view your shared content\n\n- Opt-out of personalized ads\n\nTo provide further transparency, we offer a data export option that allows you to download a copy of your data on VidChill  at any time.",
    },
    {
      title: "Children's Privacy",
      content:
        "VidChill  is intended for users who are at least 13 years old. We do not knowingly collect personal data from children under 13. If we discover that a child under 13 has provided us with personal data, we will delete it promptly.",
    },
    {
      title: "Changes to This Policy",
      content:
        "Our privacy policy may change from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.",
    },
    {
      title: "Conclusion",
      content:
        "At VidChill , your privacy is our top priority. We're committed to being open about our privacy practices and helping you understand how your data is used and protected. We believe that with these robust privacy protections in place, you can enjoy a seamless and secure video sharing experience. Remember, your use of VidChill 's services is at all times subject to our Terms of Service, which incorporates this Privacy Policy. Any questions or concerns regarding your privacy should be directed to our support team, who are dedicated to assisting you. Your trust is what fuels our commitment to privacy, and we promise to strive tirelessly to uphold this trust.",
    },
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy - VidChill </title>
        <meta
          name="description"
          content="Your privacy is important to us at VidChill . We respect your privacy regarding any information we may collect from you across our website."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout closeSidebar={true}>
        <div className="mt-4">
          <div className="mx-auto max-w-3xl text-center ">
            <p className="text-base font-semibold leading-7 text-primary-600">
              Privacy Policy
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              We care about your privacy{" "}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your privacy is important to us at Vidchill . We respect your
              privacy regarding any information we may collect from you across
              our website.
            </p>
          </div>
          <Content sections={sections} />
        </div>
      </Layout>
    </>
  );
};

export default Privacy;
