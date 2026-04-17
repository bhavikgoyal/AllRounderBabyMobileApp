import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  StatusBar,
  useColorScheme,
  useWindowDimensions,

} from 'react-native';
import ScreenScroll from './components/ScreenScroll';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const PrivacyPolicy = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#2a3144' : Colors.white,
  };
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [expandedSections, setExpandedSections] = React.useState({
    '1': true,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
    '9': false,
    '10': false,
    '11': false,
    '12': false,
  });


  useEffect(() => {
    const backAction = () => {
      if (navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
        navigation.navigate('My Profile');
        return true;
      }
      if (route && route.params && route.params.origin) {
        navigation.navigate(route.params.origin);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => {
      backHandler.remove();
      StatusBar.setHidden(false);
    };
  }, [navigation]);

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <ScreenScroll contentContainerStyle={styles.scrollContainer}>
        <View style={[
          styles.sectionContainer,
          { backgroundColor: isDarkMode ? '#282c34' : '#ffffff' },
          { borderColor: isDarkMode ? '#444' : '#e0e0e0' }
        ]}>
          <Text style={[
            styles.pageTitle,
            { color: isDarkMode ? '#fff' : '#1434a4', marginBottom: 35 }
          ]}>Privacy Policy</Text>

          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('1')}>
              <Text style={styles.sectionHeader}>
                1. Introduction, Scope, and Who We Are
              </Text>
            </TouchableOpacity>
            {expandedSections['1'] && (
              <>
                <Text style={styles.subHeading}>1.1 Purpose of this Privacy Policy</Text>
                <Text style={styles.leadText}>
                  This Privacy Policy explains how Sarvashine Allrounder Baby Solutions Private Limited, operating under the brand name Allrounder Baby ("Allrounder Baby", "Company", "we", "us", or "our"), collects, uses, stores, shares, transfers, and otherwise processes personal data in connection with our digital platform and related services.
                </Text>

                <Text style={styles.leadText}>This Privacy Policy is intended to help you understand:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• what personal data we collect,</Text>
                  <Text style={styles.listItem}>• where we collect it from,</Text>
                  <Text style={styles.listItem}>• why we use it,</Text>
                  <Text style={styles.listItem}>• the legal bases on which we process it,</Text>
                  <Text style={styles.listItem}>• when we share it,</Text>
                  <Text style={styles.listItem}>• how long we retain it,</Text>
                  <Text style={styles.listItem}>• how we protect it, and</Text>
                  <Text style={styles.listItem}>• what rights you may have in relation to your personal data.</Text>
                </View>

                <Text style={styles.subHeading}>1.2 Who this Privacy Policy applies to</Text>
                <Text style={styles.leadText}>
                  This Privacy Policy applies to individuals who interact with Allrounder Baby in any manner, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• visitors to our website,</Text>
                  <Text style={styles.listItem}>• prospective customers,</Text>
                  <Text style={styles.listItem}>• purchasers of our programs or services,</Text>
                  <Text style={styles.listItem}>• registered users with account-based access,</Text>
                  <Text style={styles.listItem}>• participants in referral, reward, feedback, testimonial, or payout-related features,</Text>
                  <Text style={styles.listItem}>• individuals who contact us for support, updates, or other communications.</Text>
                </View>

                <Text style={styles.leadText}>
                  This Privacy Policy applies in connection with our:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• website, including public and account areas,</Text>
                  <Text style={styles.listItem}>• mobile applications (including Android and iOS applications), where available,</Text>
                  <Text style={styles.listItem}>• checkout, payment, and order flows,</Text>
                  <Text style={styles.listItem}>• customer dashboards and post-purchase features,</Text>
                  <Text style={styles.listItem}>• referral, reward, payout, feedback, and testimonial features,</Text>
                  <Text style={styles.listItem}>• customer support and communication channels,</Text>
                  <Text style={styles.listItem}>• cookies, tracking technologies, pixels, SDKs, and similar tools used on our digital properties.</Text>
                </View>

                <Text style={styles.leadText}>
                  Certain features, including payout, referral, reward, feedback, or testimonial-related functions, may be available only to eligible users or customers, subject to applicable terms, eligibility conditions, verification requirements, consent flows, and internal controls.
                </Text>

                <Text style={styles.subHeading}>1.3 Who we are</Text>
                <Text style={styles.leadText}>
                  The data controller responsible for your personal data is:
                </Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Sarvashine Allrounder Baby Solutions Private Limited</Text></Text>
                <Text style={styles.leadText}>Flat A 304, Royal City, Potiya Road,</Text>
                <Text style={styles.leadText}>Durg, Chhattisgarh – 491001, India</Text>
                <Text style={styles.leadText}>Email: support@allrounderbaby.com</Text>

                <Text style={styles.leadText}>
                  Where applicable data protection laws use the term “controller,” this means that we determine the purposes and means of processing personal data.
                </Text>

                <Text style={styles.subHeading}>1.4 Our services and intended users</Text>
                <Text style={styles.leadText}>
                  Allrounder Baby is a digital early childhood development and parenting support platform intended primarily for parents, guardians, and caregivers, particularly in relation to children in the 0–5 years age group.
                </Text>

                <Text style={styles.leadText}>
                  Our core service consists of pre-recorded educational and developmental video-based programs delivered through our website and/or mobile application after purchase.
                </Text>

                <Text style={styles.leadText}>
                  Our mobile applications are distributed through platforms including the Google Play Store and the Apple App Store. Use of our applications may also be subject to the terms, policies, and privacy frameworks of these platform providers.
                </Text>

                <Text style={styles.leadText}>
                  On iOS devices, certain data collection, tracking, or attribution activities may be governed by Apple platform requirements, including user permissions and device-level privacy settings. Users may control such permissions through their device settings.
                </Text>

                <Text style={styles.leadText}>
                  Our services are intended for adults. Children are not permitted to independently create accounts or directly enter into legal agreements with us through the platform.
                </Text>

                <Text style={styles.subHeading}>1.5 Child-related information</Text>
                <Text style={styles.leadText}>
                  We do not knowingly collect personal data directly from children through independent child accounts.
                </Text>

                <Text style={styles.leadText}>
                  However, a parent or guardian may choose to provide limited child-related information voluntarily, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• age range,</Text>
                  <Text style={styles.listItem}>• developmental stage,</Text>
                  <Text style={styles.listItem}>• program-relevant contextual details,</Text>
                  <Text style={styles.listItem}>• parent-reported feedback,</Text>
                  <Text style={styles.listItem}>• optional uploaded media (such as videos) submitted through secure, logged-in feedback or testimonial features.</Text>
                </View>

                <Text style={styles.leadText}>
                  Such information:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• is provided voluntarily by the parent or guardian,</Text>
                  <Text style={styles.listItem}>• is submitted under their control and responsibility,</Text>
                  <Text style={styles.listItem}>• is not required to access or use our core services,</Text>
                  <Text style={styles.listItem}>• does not affect the delivery of our primary service, which is access to pre-recorded video content.</Text>
                </View>

                <Text style={styles.leadText}>
                  We aim to apply a high standard of care when handling child-related information, including principles such as data minimization, limited use, and avoidance of unnecessary processing.
                </Text>

                <Text style={styles.leadText}>We do not:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• knowingly allow children to independently submit personal data,</Text>
                  <Text style={styles.listItem}>• create independent child accounts,</Text>
                  <Text style={styles.listItem}>• use child-related information for sale of personal data.</Text>
                </View>

                <Text style={styles.subHeading}>1.6 Geographic scope</Text>
                <Text style={styles.leadText}>
                  We may offer our services to users in multiple jurisdictions.
                </Text>

                <Text style={styles.leadText}>
                  Depending on your location, different privacy or data protection laws may apply to our processing of personal data. We aim to process personal data in accordance with applicable legal requirements relevant to our services and user base, including requirements relating to transparency, lawful processing, consent where required, user rights, international transfers, security, and retention.
                </Text>

                <Text style={styles.leadText}>
                  The rights, disclosures, and protections available to you may vary depending on your country, state, or region of residence and the applicable data protection laws.
                </Text>

                <Text style={styles.subHeading}>1.7 Relationship with other policies and internal governance</Text>
                <Text style={styles.leadText}>
                  This Privacy Policy should be read together with our other applicable documents, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• our Terms of Use,</Text>
                  <Text style={styles.listItem}>• our Cookies Policy,</Text>
                  <Text style={styles.listItem}>• any referral, reward, feedback, payout, testimonial, campaign, or offer-specific terms,</Text>
                  <Text style={styles.listItem}>• any consent requests, release forms, or authorization notices presented at the point of collection,</Text>
                  <Text style={styles.listItem}>• any just-in-time notices shown within our website, account area, or applications.</Text>
                </View>

                <Text style={styles.leadText}>
                  We may maintain internal governance processes such as access controls, verification workflows, audit records, moderation systems, fraud detection mechanisms, and operational logs to support security, compliance, and accountability.
                </Text>

                <Text style={styles.leadText}>
                  These internal processes are designed to support responsible data handling but do not reduce any rights available to users under applicable law.
                </Text>

                <Text style={styles.subHeading}>1.8 Relationship with contractual terms</Text>
                <Text style={styles.leadText}>
                  This Privacy Policy explains how we handle personal data. It does not by itself override contractual terms that apply to specific products, services, transactions, campaigns, payouts, feedback programs, or testimonial features, except where required by applicable law.
                </Text>

                <Text style={styles.leadText}>
                  Your use of our services may also be subject to our Terms of Use and other applicable policies, notices, and consent mechanisms.
                </Text>

                <Text style={styles.subHeading}>1.9 Changes to this Privacy Policy</Text>
                <Text style={styles.leadText}>
                  We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or operational practices.
                </Text>

                <Text style={styles.leadText}>
                  Unless otherwise stated, updates become effective when posted on the Platform or on the effective date mentioned.
                </Text>

                <Text style={styles.leadText}>
                  Where required by applicable law, or where changes are material, we may provide additional notice via the Platform, email, WhatsApp, or other communication channels.
                </Text>

                <Text style={styles.leadText}>
                  Continued use of the Platform after an updated Privacy Policy becomes effective means that the updated Policy will apply to your ongoing use of the Platform, except that any processing that requires your consent under applicable law will continue to depend on that consent and will not be deemed granted merely by continued use.
                </Text>

                <Text style={styles.subHeading}>1.10 Contact us</Text>
                <Text style={styles.leadText}>
                  If you have any questions, concerns, or requests relating to this Privacy Policy or our handling of personal data, you may contact us at:
                </Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Sarvashine Allrounder Baby Solutions Private Limited</Text></Text>
                <Text style={styles.leadText}>Flat A 304, Royal City, Potiya Road,</Text>
                <Text style={styles.leadText}>Durg, Chhattisgarh – 491001, India</Text>
                <Text style={styles.leadText}>Email: support@allrounderbaby.com</Text>

              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('2')}>
              <Text style={styles.sectionHeader}>2. Personal Data We Collect</Text>
            </TouchableOpacity>
            {expandedSections['2'] && (
              <>
                <Text style={styles.subHeading}>2.1 Overview</Text>
                <Text style={styles.leadText}>
                  We collect different categories of data depending on your interaction with the Platform, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• information you provide directly;</Text>
                  <Text style={styles.listItem}>• information collected automatically;</Text>
                  <Text style={styles.listItem}>• information required for payouts or compliance;</Text>
                  <Text style={styles.listItem}>• information related to child development inputs provided voluntarily;</Text>
                  <Text style={styles.listItem}>• information from third-party services.</Text>
                </View>

                <Text style={styles.leadText}>
                  We collect personal data to operate, provide, support, improve, secure, and manage our services and related business functions.
                </Text>

                <Text style={styles.leadText}>
                  The type and amount of personal data we collect depends on how you interact with our platform, including whether you:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• browse our website,</Text>
                  <Text style={styles.listItem}>• make a purchase,</Text>
                  <Text style={styles.listItem}>• access purchased content,</Text>
                  <Text style={styles.listItem}>• create or update a profile,</Text>
                  <Text style={styles.listItem}>• participate in referral, reward, feedback, or testimonial programs,</Text>
                  <Text style={styles.listItem}>• submit payout details,</Text>
                  <Text style={styles.listItem}>• contact customer support,</Text>
                  <Text style={styles.listItem}>• upload content voluntarily,</Text>
                  <Text style={styles.listItem}>• interact with cookies or tracking technologies.</Text>
                </View>

                <Text style={styles.leadText}>
                  Certain data is necessary for providing our core services, while other data is optional and depends on your participation in additional features.
                </Text>

                <Text style={styles.subHeading}>2.2 Personal data you provide directly</Text>
                <Text style={styles.leadText}>
                  You may provide personal data directly when interacting with our platform, services, or features.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(a) Identity and contact data</Text>
                <Text style={styles.leadText}>This may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• full name,</Text>
                  <Text style={styles.listItem}>• email address,</Text>
                  <Text style={styles.listItem}>• mobile number,</Text>
                  <Text style={styles.listItem}>• WhatsApp number,</Text>
                  <Text style={styles.listItem}>• country or region,</Text>
                  <Text style={styles.listItem}>• billing or postal address (where required).</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(b) Account and access data</Text>
                <Text style={styles.leadText}>Where applicable, this may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• login identifiers,</Text>
                  <Text style={styles.listItem}>• authentication data (such as OTP-based access),</Text>
                  <Text style={styles.listItem}>• account status and preferences.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(c) Transaction and purchase data</Text>
                <Text style={styles.leadText}>This may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• purchased program details,</Text>
                  <Text style={styles.listItem}>• order and invoice records,</Text>
                  <Text style={styles.listItem}>• transaction identifiers,</Text>
                  <Text style={styles.listItem}>• payment status.</Text>
                </View>

                <Text style={styles.leadText}>
                  Payments are processed through third-party providers such as Razorpay, Cashfree, or PayPal. We do not store full card numbers or equivalent sensitive payment credentials.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(d) Referral, reward, feedback, and program data</Text>
                <Text style={styles.leadText}>
                  If you participate in referral or feedback-based programs, we may collect:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• referral codes and referral relationships,</Text>
                  <Text style={styles.listItem}>• eligibility and approval status,</Text>
                  <Text style={styles.listItem}>• reward or payout status,</Text>
                  <Text style={styles.listItem}>• feedback submissions,</Text>
                  <Text style={styles.listItem}>• testimonial participation data.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(e) Domestic payout data (India)</Text>
                <Text style={styles.leadText}>
                  If you choose to receive payouts, we may collect:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• bank account holder name,</Text>
                  <Text style={styles.listItem}>• bank account number,</Text>
                  <Text style={styles.listItem}>• IFSC code and bank name,</Text>
                  <Text style={styles.listItem}>• UPI ID and confirmation,</Text>
                  <Text style={styles.listItem}>• name as per bank or UPI,</Text>
                  <Text style={styles.listItem}>• email and phone number for payout records,</Text>
                  <Text style={styles.listItem}>• PAN (optional but may affect payout processing).</Text>
                </View>

                <Text style={styles.leadText}>
                  PAN may be requested or required to comply with applicable tax laws and withholding obligations. Where PAN is not provided, not verified, or invalid, higher tax deduction or withholding may be applied in accordance with applicable regulations.
                </Text>

                <Text style={styles.leadText}>
                  Where multiple payout methods are available, only one payout method may be active at a time. Updating or selecting one method (such as UPI) may replace previously stored payout details (such as bank account information).
                </Text>

                <Text style={styles.leadText}>
                  Where required for payouts, verification, or compliance, we may collect tax-related information such as PAN or equivalent identifiers. Such information is collected solely for validation, regulatory compliance, and payout processing purposes and is not used for marketing.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(f) International payout data</Text>
                <Text style={styles.leadText}>
                  For international payouts, we may collect:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• full legal name,</Text>
                  <Text style={styles.listItem}>• payout email address,</Text>
                  <Text style={styles.listItem}>• phone number with country code,</Text>
                  <Text style={styles.listItem}>• country of residence,</Text>
                  <Text style={styles.listItem}>• postal address,</Text>
                  <Text style={styles.listItem}>• optional tax identification information where required.</Text>
                </View>

                <Text style={styles.leadText}>
                  International payouts may be processed through third-party platforms such as Tremendous.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(g) Declarations and confirmations</Text>
                <Text style={styles.leadText}>
                  We may collect confirmations that:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• the provided payout details belong to you,</Text>
                  <Text style={styles.listItem}>• the information submitted is accurate,</Text>
                  <Text style={styles.listItem}>• you understand payout, consent, or program-related terms.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(h) Communications data</Text>
                <Text style={styles.leadText}>This may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• support queries,</Text>
                  <Text style={styles.listItem}>• emails and messages,</Text>
                  <Text style={styles.listItem}>• complaint records,</Text>
                  <Text style={styles.listItem}>• survey responses.</Text>
                </View>

                <Text style={styles.subHeading}>2.3 Child-related and feedback data (voluntary)</Text>
                <Text style={styles.leadText}>
                  Child-related information, such as age, developmental stage, parent-reported observations, or optional media voluntarily submitted by a parent or guardian, is collected only when the parent or guardian chooses to provide it. Such data is not required for access to our core pre-recorded content and is used only for the limited purposes described in this Privacy Policy, such as feedback handling, optional program-related features, internal analysis, program improvement, and other specifically authorized uses.
                </Text>

                <Text style={styles.leadText}>
                  Public marketing or promotional use of such content will occur only where such use has been clearly disclosed at the time of submission, and the user has acknowledged such use through acceptance of applicable policies and submission of the content.
                </Text>

                <Text style={styles.leadText}>
                  Where feedback-based programs are linked to rewards or payouts, users may be requested to submit testimonial or experience-based content. Such submissions may include:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• a general feedback or testimonial video, where applicable to a specific voluntary feedback, reward, or testimonial workflow,</Text>
                  <Text style={styles.listItem}>• optional child-related content or demonstrations, which are not mandatory.</Text>
                </View>

                <Text style={styles.leadText}>
                  Submission of child-related content is always voluntary and is not required to access services or to participate in core platform functionality.
                </Text>

                <Text style={styles.leadText}>
                  Where feedback, testimonials, or media content are submitted as part of voluntary programs (including reward or payout-based participation), such submissions may include consent for internal use and, where such use has been clearly disclosed at the time of submission, for marketing or promotional use based on the user's acceptance of applicable policies during submission and the act of submission.
                </Text>

                <Text style={styles.leadText}>
                  Users are clearly informed of the intended use of such content at the point of submission, and any marketing or public usage is based on the user's acceptance of applicable policies during submission together with the act of submission, as required or permitted under applicable law.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Clarification on Submission-Based Authorization</Text>
                <Text style={styles.leadText}>
                  Where feedback, testimonials, images, audio, or videos are submitted through a workflow that clearly discloses intended use (including marketing, promotional, or public display purposes), the user's acceptance of applicable policies at the time of submission, together with the act of submission, shall be treated as informed acknowledgment and authorization for such use.
                </Text>

                <Text style={styles.leadText}>
                  Such authorization is considered part of the submission process and does not require a separate standalone consent mechanism, unless required under applicable law.
                </Text>

                <Text style={styles.subHeading}>2.4 Personal data collected automatically</Text>
                <Text style={styles.leadText}>
                  When you use our platform, we may collect certain technical and usage data.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(a) Device and technical data</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• IP address,</Text>
                  <Text style={styles.listItem}>• browser type and version,</Text>
                  <Text style={styles.listItem}>• device type and operating system,</Text>
                  <Text style={styles.listItem}>• language settings,</Text>
                  <Text style={styles.listItem}>• approximate location (derived from technical signals).</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(b) Usage and interaction data</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• pages visited,</Text>
                  <Text style={styles.listItem}>• navigation patterns,</Text>
                  <Text style={styles.listItem}>• session duration,</Text>
                  <Text style={styles.listItem}>• clicks and interactions,</Text>
                  <Text style={styles.listItem}>• feature usage,</Text>
                  <Text style={styles.listItem}>• video interaction events (where applicable).</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(c) Authentication and security data</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• login attempts,</Text>
                  <Text style={styles.listItem}>• session identifiers,</Text>
                  <Text style={styles.listItem}>• OTP verification activity,</Text>
                  <Text style={styles.listItem}>• device or session controls,</Text>
                  <Text style={styles.listItem}>• failed access attempts.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(d) Cookies and tracking technologies</Text>
                <Text style={styles.leadText}>
                  We may use cookies, pixels, SDKs, and similar technologies for:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• platform functionality and security,</Text>
                  <Text style={styles.listItem}>• analytics and performance measurement,</Text>
                  <Text style={styles.listItem}>• advertising and campaign effectiveness,</Text>
                  <Text style={styles.listItem}>• remarketing and retargeting,</Text>
                  <Text style={styles.listItem}>• personalization (where applicable)</Text>
                </View>
                <Text style={styles.leadText}>Non-essential tracking technologies are used only after obtaining your consent where required by applicable law.</Text>

                <Text style={styles.subHeading}>2.5 Personal data from third parties</Text>
                <Text style={styles.leadText}>
                  We may receive limited data from trusted third-party providers, including:
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(a) Payment providers</Text>
                <Text style={styles.leadText}>
                  Transaction confirmations and payment status from providers such as Razorpay, Cashfree, or PayPal.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(b) Validation providers</Text>
                <Text style={styles.leadText}>
                  Verification results for bank accounts, PAN, or related data from providers used in payout workflows.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(c) Payout providers</Text>
                <Text style={styles.leadText}>
                  Payout status and processing information from providers such as Tremendous.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(d) Service and technology providers</Text>
                <Text style={styles.leadText}>
                  Technical and usage-related data from providers supporting:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• analytics,</Text>
                  <Text style={styles.listItem}>• hosting and infrastructure,</Text>
                  <Text style={styles.listItem}>• video delivery (e.g., DRM systems),</Text>
                  <Text style={styles.listItem}>• messaging and communication,</Text>
                  <Text style={styles.listItem}>• platform operations.</Text>
                </View>

                <Text style={styles.subHeading}>2.6 Internal records and system-generated data</Text>
                <Text style={styles.leadText}>
                  We may generate and maintain internal records to support operations, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• payout processing records,</Text>
                  <Text style={styles.listItem}>• verification and validation results,</Text>
                  <Text style={styles.listItem}>• fraud detection indicators,</Text>
                  <Text style={styles.listItem}>• moderation decisions,</Text>
                  <Text style={styles.listItem}>• referral and reward tracking data,</Text>
                  <Text style={styles.listItem}>• audit and compliance records,</Text>
                  <Text style={styles.listItem}>• dispute and exception handling records.</Text>
                </View>

                <Text style={styles.leadText}>
                  These records may include personal data where necessary for operational, security, compliance, or legal purposes.
                </Text>

                <Text style={styles.leadText}>
                  For certain processes such as payout validation, account verification, or fraud prevention, we may implement system controls such as validation checks, attempt limits, cooldown periods, or verification workflows. These controls are designed to protect users, prevent misuse, and maintain platform integrity.
                </Text>

                <Text style={styles.subHeading}>2.7 Mandatory and optional data</Text>
                <Text style={styles.leadText}>
                  Some personal data is required to provide services, while other data is optional.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Mandatory data (for core services)</Text>
                <Text style={styles.leadText}>This may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• name,</Text>
                  <Text style={styles.listItem}>• email or mobile number,</Text>
                  <Text style={styles.listItem}>• payment-related information required to complete a purchase,</Text>
                  <Text style={styles.listItem}>• authentication data required for access.</Text>
                </View>

                <Text style={styles.leadText}>
                  Without this data, we may not be able to provide the purchased service.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Optional or feature-based data</Text>
                <Text style={styles.leadText}>This may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• child-related data,</Text>
                  <Text style={styles.listItem}>• feedback responses,</Text>
                  <Text style={styles.listItem}>• media uploads,</Text>
                  <Text style={styles.listItem}>• referral participation data,</Text>
                  <Text style={styles.listItem}>• payout details (only if claiming payouts),</Text>
                  <Text style={styles.listItem}>• PAN or tax-related information,</Text>
                  <Text style={styles.listItem}>• testimonial or marketing permissions.</Text>
                </View>

                <Text style={styles.leadText}>
                  Providing such data is optional, but certain features (such as payouts or rewards) may not function without required information.
                </Text>

                <Text style={styles.subHeading}>2.8 Data source summary</Text>
                <Text style={styles.leadText}>
                  We may collect personal data:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• directly from you,</Text>
                  <Text style={styles.listItem}>• automatically through your use of our platform,</Text>
                  <Text style={styles.listItem}>• from third-party service providers supporting payments, payouts, analytics, and infrastructure,</Text>
                  <Text style={styles.listItem}>• from internal systems used for verification, security, and compliance.</Text>
                </View>

                <Text style={styles.subHeading}>2.9 Data sensitivity and handling</Text>
                <Text style={styles.leadText}>
                  Certain categories of personal data, such as:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• financial and payout-related data,</Text>
                  <Text style={styles.listItem}>• identification numbers (such as PAN),</Text>
                  <Text style={styles.listItem}>• account access data,</Text>
                  <Text style={styles.listItem}>• uploaded media content,</Text>
                </View>

                <Text style={styles.leadText}>
                  may be treated as higher-sensitivity data under our internal data classification and risk management practices.
                </Text>

                <Text style={styles.leadText}>
                  Such data may be subject to additional safeguards, access controls, and handling measures appropriate to its nature and associated risks.
                </Text>
                <Text style={styles.subHeading}>2.10 Legal Basis for Processing (Where Applicable)</Text>
                <Text style={styles.leadText}>
                  • Where required by applicable data protection laws (including GDPR or similar regulations), we process personal data on one or more of the following legal bases:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• performance of a contract (e.g., providing program access after purchase);</Text>
                  <Text style={styles.listItem}>• compliance with legal obligations (e.g., tax, accounting, regulatory requirements);</Text>
                  <Text style={styles.listItem}>• legitimate interests (e.g., fraud prevention, platform security, analytics, service improvement, and internal operations);</Text>
                  <Text style={styles.listItem}>• consent or submission-based authorization (where such authorization is obtained through clearly disclosed submission workflows and acceptance of applicable policies during submission), as permitted under applicable law (e.g., marketing communications, cookies, tracking technologies, testimonials, or optional data submission);</Text>
                  <Text style={styles.listItem}>• other lawful bases as permitted under applicable laws.</Text>
                </View>

                <Text style={styles.leadText}>
                  Where processing is based on consent, you may withdraw such consent at any time, without affecting the lawfulness of processing prior to withdrawal.
                </Text>

                <Text style={styles.subHeading}>2.10A Jurisdiction-Specific Legal Basis Clarification</Text>
                <Text style={styles.leadText}>
                  The legal bases described above, including consent, contractual necessity, and legitimate interests, are primarily intended to comply with applicable international data protection laws such as the General Data Protection Regulation (GDPR) for users located in the European Union.
                </Text>

                <Text style={styles.leadText}>
                  For users located in India, personal data is processed in accordance with applicable Indian laws, including the Digital Personal Data Protection framework and the Information Technology Act and Rules. Such processing is based on:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• voluntary provision of data by the user,</Text>
                  <Text style={styles.listItem}>• consent provided at the time of data collection or submission-based authorization (where such authorization is obtained through clearly disclosed submission workflows and acceptance of applicable policies during submission), as permitted under applicable law,</Text>
                  <Text style={styles.listItem}>• necessity to provide requested services,</Text>
                  <Text style={styles.listItem}>• compliance with legal and regulatory obligations,</Text>
                  <Text style={styles.listItem}>• other lawful purposes permitted under applicable Indian law.</Text>
                </View>

                <Text style={styles.leadText}>
                  References to “legitimate interests” or similar legal bases should be interpreted in a manner consistent with the laws applicable to the user's jurisdiction.
                </Text>
                <Text style={styles.subHeading}>2.11 Unified Authorization Framework for User-Submitted Content</Text>
                <Text style={styles.leadText}>
                  For clarity, where users submit feedback, testimonials, images, audio, or video content through workflows that clearly disclose intended use (including marketing, promotional, or public display purposes):
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• such disclosure shall define the scope of use;</Text>
                  <Text style={styles.listItem}>• acceptance of applicable policies at the time of submission; and</Text>
                  <Text style={styles.listItem}>• the act of submission itself</Text>
                </View>
                <Text style={styles.leadText}>
                  shall together constitute informed acknowledgment and authorization for such use.
                </Text>

                <Text style={styles.leadText}>
                  This authorization:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• forms part of the submission process;</Text>
                  <Text style={styles.listItem}>• does not require a separate standalone consent mechanism unless required under applicable law; and</Text>
                  <Text style={styles.listItem}>• shall be interpreted in accordance with applicable data protection laws, including GDPR and relevant Indian data protection laws.</Text>
                </View>

                <Text style={styles.leadText}>
                  Where required by applicable law, such authorization shall be treated as valid consent, provided that the disclosure is clear, specific, and transparent at the point of submission.
                </Text>

              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('3')}>
              <Text style={styles.sectionHeader}>3. How and Why We Use Personal Data (Purposes and Legal Bases)</Text>
            </TouchableOpacity>
            {expandedSections['3'] && (
              <>
                <Text style={styles.subHeading}>3.1 Overview</Text>
                <Text style={styles.leadText}>
                  The Company processes personal data in accordance with applicable laws based on the user's location, including GDPR principles for EU users and applicable Indian data protection laws for users in India.
                </Text>

                <Text style={styles.leadText}>
                  We process personal data for specific, defined purposes related to the operation, delivery, improvement, security, and promotion of our services.
                </Text>

                <Text style={styles.leadText}>
                  Depending on the context, we rely on one or more of the following legal bases:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• <Text style={{ fontWeight: '700' }}>Contractual necessity</Text> — where processing is required to provide services requested by you</Text>
                  <Text style={styles.listItem}>• <Text style={{ fontWeight: '700' }}>Legal obligation</Text> — where processing is required to comply with applicable laws</Text>
                  <Text style={styles.listItem}>• <Text style={{ fontWeight: '700' }}>Legitimate interests</Text> — where processing is necessary for our business operations, provided such interests are not overridden by your rights</Text>
                  <Text style={styles.listItem}>• <Text style={{ fontWeight: '700' }}>Consent</Text> — where processing is necessary for our business operations, provided such interests are not overridden by your rights</Text>
                </View>

                <Text style={styles.leadText}>
                  The applicable legal basis depends on the nature of the processing activity described below.
                </Text>

                <Text style={styles.leadText}>
                  Where processing is based on legitimate interests, such processing is carried out only where permitted under applicable law and balanced against user rights, and may not apply in all jurisdictions.
                </Text>

                <Text style={styles.subHeading}>3.2 Providing and delivering services</Text>
                <Text style={styles.leadText}>
                  We process personal data to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• provide access to purchased programs and content,</Text>
                  <Text style={styles.listItem}>• deliver pre-recorded video-based services,</Text>
                  <Text style={styles.listItem}>• manage purchases, invoices, and transactions,</Text>
                  <Text style={styles.listItem}>• authenticate users and manage access,</Text>
                  <Text style={styles.listItem}>• provide customer support and service communications.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Contractual necessity</Text>
                <Text style={styles.leadText}>Without this processing, we would not be able to provide our services.</Text>

                <Text style={styles.subHeading}>3.3 Managing referrals, rewards, feedback, and payouts</Text>
                <Text style={styles.leadText}>
                  We process personal data to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• track referrals and link referrers and customers,</Text>
                  <Text style={styles.listItem}>• determine eligibility for rewards, cashback, or payouts,</Text>
                  <Text style={styles.listItem}>• review and evaluate feedback or testimonial submissions,</Text>
                  <Text style={styles.listItem}>• use testimonials, feedback, or user-submitted content (including child-related content where applicable) for marketing or promotional purposes where such use has been clearly disclosed at the time of submission and acknowledged by the user through acceptance of applicable policies during submission and submission of the content;</Text>
                  <Text style={styles.listItem}>• process and execute payouts,</Text>
                  <Text style={styles.listItem}>• maintain records for payout tracking, audit, and dispute resolution.</Text>
                </View>

                <Text style={styles.leadText}>
                  This may include processing payout-related information such as bank details, UPI IDs, PAN, or international payout details.
                </Text>

                <Text style={styles.leadText}>
                  Where applicable:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• higher tax deduction or withholding may apply if required information (such as PAN) is not provided or validated,</Text>
                  <Text style={styles.listItem}>• payout processing may depend on submission, verification, and approval workflows.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Contractual necessity</Text>
                <Text style={styles.leadText}>Legal obligation</Text>
                <Text style={styles.leadText}>Legitimate interests (including fraud prevention, validation, and operational integrity)</Text>

                <Text style={styles.subHeading}>3.4 Verification, fraud prevention, and platform integrity</Text>
                <Text style={styles.leadText}>
                  We process personal data to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• verify identity and payout details,</Text>
                  <Text style={styles.listItem}>• validate bank accounts, UPI IDs, or tax-related identifiers,</Text>
                  <Text style={styles.listItem}>• detect and prevent fraud, misuse, or unauthorized activity,</Text>
                  <Text style={styles.listItem}>• identify duplicate or suspicious accounts,</Text>
                  <Text style={styles.listItem}>• enforce platform rules and eligibility criteria,</Text>
                  <Text style={styles.listItem}>• maintain audit trails and investigation records.</Text>
                </View>

                <Text style={styles.leadText}>
                  This may include monitoring:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• login attempts,</Text>
                  <Text style={styles.listItem}>• validation attempts,</Text>
                  <Text style={styles.listItem}>• account activity patterns,</Text>
                  <Text style={styles.listItem}>• payout-related behavior.</Text>
                </View>

                <Text style={styles.leadText}>
                  Decisions involving account restrictions, payout approval, or fraud detection are <Text style={{ fontWeight: '700' }}>not based solely on automated processing</Text> and involve human review where appropriate.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Legitimate interests</Text>
                <Text style={styles.leadText}>Legal obligation (where applicable)</Text>
                <Text style={styles.subHeading}>3.5 Improving services, analytics, and product development</Text>
                <Text style={styles.leadText}>
                  We process personal data to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• understand how users interact with our platform,</Text>
                  <Text style={styles.listItem}>• analyze usage patterns and engagement,</Text>
                  <Text style={styles.listItem}>• improve content, features, and user experience,</Text>
                  <Text style={styles.listItem}>• evaluate feedback and responses,</Text>
                  <Text style={styles.listItem}>• develop new services and program enhancements,</Text>
                  <Text style={styles.listItem}>• conduct internal analysis and business insights.</Text>
                </View>

                <Text style={styles.leadText}>
                  Where possible, we may use aggregated or non-identifiable data for long-term analysis.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Legitimate interests</Text>

                <Text style={styles.subHeading}>3.6 Personalization, profiling, and optimization</Text>
                <Text style={styles.leadText}>
                  We may process personal data to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• personalize user experience within the platform,</Text>
                  <Text style={styles.listItem}>• tailor content, recommendations, or communications,</Text>
                  <Text style={styles.listItem}>• segment users based on behavior, preferences, or engagement,</Text>
                  <Text style={styles.listItem}>• improve relevance of offers, features, and messaging,</Text>
                  <Text style={styles.listItem}>• optimize marketing campaigns and performance.</Text>
                </View>

                <Text style={styles.leadText}>
                  This may involve profiling based on:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• interaction patterns,</Text>
                  <Text style={styles.listItem}>• feedback data,</Text>
                  <Text style={styles.listItem}>• usage behavior,</Text>
                  <Text style={styles.listItem}>• preferences or contextual information.</Text>
                </View>

                <Text style={styles.leadText}>
                  We do not use profiling to make solely automated decisions that produce legal or similarly significant effects without appropriate human involvement where required by applicable law.
                </Text>

                <Text style={styles.leadText}>
                  You have the right to object to such processing where it is based on legitimate interests, subject to applicable law.
                </Text>

                <Text style={styles.leadText}>
                  Where profiling is based on legitimate interests, users have the right to object to such processing at any time, and we will assess such objections in accordance with applicable law.
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Legitimate interests</Text>

                <Text style={styles.leadText}>
                  We do not use profiling involving sensitive personal data or special categories of data for advertising or marketing purposes.
                </Text>
                <Text style={styles.subHeading}>3.7 Marketing communications</Text>
                <Text style={styles.leadText}>We may use your personal data to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• send service-related updates,</Text>
                  <Text style={styles.listItem}>• share educational or product-related content,</Text>
                  <Text style={styles.listItem}>• communicate offers, campaigns, or new features,</Text>
                  <Text style={styles.listItem}>• provide relevant information related to your purchase or usage.</Text>
                </View>

                <Text style={styles.leadText}>Where you are an existing customer:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• we may send communications based on a legitimate interest (soft opt-in),</Text>
                  <Text style={styles.listItem}>• such communications will relate to similar services,</Text>
                  <Text style={styles.listItem}>• you will be provided with clear and easy opt-out options.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Legitimate interests</Text>
                <Text style={styles.leadText}>Consent (where required)</Text>

                <Text style={styles.leadText}>Where required by applicable law, we will obtain your consent before sending marketing communications.</Text>

                <Text style={styles.leadText}>Where marketing communications are based on legitimate interests, such communications are limited to existing customers, relate to similar services, and include a clear and simple opt-out mechanism in every communication. Where required under applicable law, such communications will be sent only with prior consent.</Text>

                <Text style={styles.leadText}>Users are provided with a clear and simple mechanism to opt out of such communications at any time, and such opt-out requests are respected without undue delay.</Text>

                <Text style={styles.leadText}>For users located in the European Economic Area, direct marketing communications shall be based on prior consent where required under applicable law, except where a soft opt-in is permitted in accordance with applicable regulations.</Text>


                <Text style={styles.subHeading}>3.8 Advertising, remarketing, and tracking</Text>
                <Text style={styles.leadText}>We process personal data to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• measure campaign performance,</Text>
                  <Text style={styles.listItem}>• understand user behavior across sessions or platforms,</Text>
                  <Text style={styles.listItem}>• build audiences for advertising,</Text>
                  <Text style={styles.listItem}>• enable remarketing or retargeting,</Text>
                  <Text style={styles.listItem}>• optimize advertising effectiveness,</Text>
                  <Text style={styles.listItem}>• manage frequency and relevance of advertisements.</Text>
                </View>

                <Text style={styles.leadText}>This may involve the use of:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• cookies,</Text>
                  <Text style={styles.listItem}>• pixels,</Text>
                  <Text style={styles.listItem}>• SDKs,</Text>
                  <Text style={styles.listItem}>• device identifiers,</Text>
                  <Text style={styles.listItem}>• interaction and event data.</Text>
                </View>

                <Text style={styles.leadText}>
                  Non-essential tracking and advertising technologies are used <Text style={{ fontWeight: '700' }}>only after obtaining your consent where required by applicable law.</Text>
                </Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Consent (for non-essential tracking and advertising)</Text>
                <Text style={styles.leadText}>Legitimate interests (for essential analytics and operational insights)</Text>

                <Text style={styles.leadText}>Where consent is required under applicable law, such processing will not be carried out on the basis of legitimate interests alone.</Text>

                <Text style={styles.subHeading}>3.9 Communications and support</Text>
                <Text style={styles.leadText}>We process personal data to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• respond to queries and support requests,</Text>
                  <Text style={styles.listItem}>• provide important service-related communications,</Text>
                  <Text style={styles.listItem}>• manage customer relationships,</Text>
                  <Text style={styles.listItem}>• maintain records of communications for quality and compliance purposes.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Contractual necessity</Text>
                <Text style={styles.leadText}>Legitimate interests</Text>

                <Text style={styles.subHeading}>3.10 Testimonials, feedback, and media processing</Text>
                <Text style={styles.leadText}>We process feedback, testimonial submissions, and uploaded content to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• evaluate and review submissions,</Text>
                  <Text style={styles.listItem}>• determine eligibility for rewards or payouts,</Text>
                  <Text style={styles.listItem}>• improve services and understand user experiences,</Text>
                  <Text style={styles.listItem}>• maintain internal records and audit trails.</Text>
                </View>

                <Text style={styles.leadText}>Submission of feedback or media content:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• is voluntary,</Text>
                  <Text style={styles.listItem}>• may be linked to reward or payout programs,</Text>
                  <Text style={styles.listItem}>• may be subject to review and approval processes.</Text>
                </View>

                <Text style={styles.leadText}>We do not use submitted content for public marketing purposes unless such use has been clearly disclosed at the time of submission and acknowledged by the user through acceptance of applicable policies during submission and submission of the content, where permitted or required under applicable law.</Text>

                <Text style={styles.leadText}>Where feedback, testimonials, or media content are submitted through workflows that clearly disclose intended use, including potential marketing or promotional use, the user's acceptance of applicable policies at the time of submission, together with the act of submission, constitutes acknowledgment and authorization for such use.</Text>

                <Text style={styles.leadText}>Such authorization is considered part of voluntary participation in feedback, testimonial, or reward-based programs and does not require a separate standalone consent mechanism, unless required under applicable law.</Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Contractual necessity (for program participation and payouts)</Text>
                <Text style={styles.leadText}>Legitimate interests (for internal analysis and improvement)</Text>
                <Text style={styles.leadText}>Consent or submission-based authorization (where such authorization is obtained through clearly disclosed submission workflows and acceptance of applicable policies during submission), as permitted under applicable law.</Text>

                <Text style={styles.subHeading}>3.11 Legal compliance and enforcement</Text>
                <Text style={styles.leadText}>We may process personal data to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• comply with applicable laws, regulations, and tax requirements,</Text>
                  <Text style={styles.listItem}>• respond to lawful requests from authorities,</Text>
                  <Text style={styles.listItem}>• enforce our Terms of Use and policies,</Text>
                  <Text style={styles.listItem}>• establish, exercise, or defend legal claims.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Legal obligation</Text>
                <Text style={styles.leadText}>Legitimate interests</Text>


                <Text style={styles.subHeading}>3.12 Internal research, analysis, and program improvement</Text>
                <Text style={styles.leadText}>We may use personal data for internal research, analysis, quality review, and program improvement, including evaluating the effectiveness of our content, services, and user experience.</Text>

                <Text style={styles.leadText}>Where feasible, we aim to use aggregated, de-identified, or anonymized information for these purposes.</Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Legitimate interests</Text>
                <Text style={styles.leadText}>Consent, where required by applicable law or where we rely on optional submissions provided for such use</Text>


                <Text style={styles.subHeading}>3.13 Marketing, testimonials, and user-submitted content</Text>
                <Text style={styles.leadText}>We may use testimonials, feedback, and user-submitted content, including child-related content where applicable, for marketing, promotional, or public-facing purposes where such use has been clearly disclosed at the time of submission.</Text>

                <Text style={styles.leadText}>Where such disclosure is provided, the user's acceptance of applicable policies during submission, together with the act of submission, shall constitute acknowledgment and authorization for such use.</Text>

                <Text style={styles.leadText}>Such authorization forms part of the user's voluntary participation in feedback, testimonial, or reward-related workflows and does not require a separate standalone consent mechanism unless required by applicable law.</Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>Legal basis:</Text>
                <Text style={styles.leadText}>Consent or submission-based authorization (where such authorization is obtained through clearly disclosed submission workflows and acceptance of applicable policies during submission), as permitted under applicable law.</Text>

              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('4')}>
              <Text style={styles.sectionHeader}>4. How We Share and Disclose Personal Data</Text>
            </TouchableOpacity>
            {expandedSections['4'] && (
              <>
                <Text style={styles.subHeading}>4.1 Overview</Text>
                <Text style={[styles.leadText, { marginBottom: 8 }]}>
                  We may share personal data with third parties where necessary to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• provide and operate our services,</Text>
                  <Text style={styles.listItem}>• process payments and payouts,</Text>
                  <Text style={styles.listItem}>• support analytics and platform functionality,</Text>
                  <Text style={styles.listItem}>• communicate with users,</Text>
                  <Text style={styles.listItem}>• comply with legal and regulatory obligations,</Text>
                  <Text style={styles.listItem}>• protect our rights, users, and platform.</Text>
                </View>

                <Text style={[styles.leadText, { marginBottom: 8 }]}>
                  We do not sell personal data as a standalone commercial activity involving exchange of personal data for monetary consideration.
                </Text>

                <Text style={[styles.subHeading, { marginTop: 12 }]}>Vendor disclosure (illustrative categories):</Text>
                <Text style={styles.leadText}>
                  We may share personal data with trusted third-party service providers strictly for operational purposes, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• video hosting and streaming providers (e.g., VdoCipher or equivalent);</Text>
                  <Text style={styles.listItem}>• messaging and communication providers (e.g., SMS or WhatsApp service providers);</Text>
                  <Text style={styles.listItem}>• payment gateways and financial processors (e.g., Razorpay, PayPal, or equivalent);</Text>
                  <Text style={styles.listItem}>• payout and reward processing providers (e.g., Tremendous or equivalent);</Text>
                  <Text style={styles.listItem}>• analytics and business intelligence tools (e.g., Power BI or equivalent);</Text>
                  <Text style={styles.listItem}>• cloud infrastructure and storage providers.</Text>
                </View>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.2 Service providers (processors and operational partners)</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>
                  We engage third-party service providers who support our platform and business operations. These providers process personal data on our behalf or as part of integrated services.
                </Text>

                <Text style={styles.leadText}>This may include providers supporting:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• payment processing,</Text>
                  <Text style={styles.listItem}>• payout processing,</Text>
                  <Text style={styles.listItem}>• infrastructure and hosting,</Text>
                  <Text style={styles.listItem}>• video delivery and content protection,</Text>
                  <Text style={styles.listItem}>• messaging and communication,</Text>
                  <Text style={styles.listItem}>• analytics and performance monitoring,</Text>
                  <Text style={styles.listItem}>• platform operations and administration,</Text>
                  <Text style={styles.listItem}>• mobile platform and application distribution providers, including Google Play Store and Apple App Store, where relevant</Text>
                </View>

                <Text style={styles.leadText}>Examples of such providers include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}><Text style={{ fontWeight: '700' }}>• Razorpay, Cashfree, PayPal</Text> (payment processing),</Text>
                  <Text style={styles.listItem}><Text style={{ fontWeight: '700' }}>• Tremendous</Text> (international payouts),</Text>
                  <Text style={styles.listItem}><Text style={{ fontWeight: '700' }}>• Microsoft Azure / infrastructure providers</Text> (hosting and storage),</Text>
                  <Text style={styles.listItem}><Text style={{ fontWeight: '700' }}>• VdoCipher</Text> (video delivery and DRM),</Text>
                  <Text style={styles.listItem}><Text style={{ fontWeight: '700' }}>• MSG91</Text> (communication and messaging services),</Text>
                  <Text style={styles.listItem}><Text style={{ fontWeight: '700' }}>• Google services / Firebase / analytics tools</Text> (analytics, app performance, tracking),</Text>
                  <Text style={styles.listItem}><Text style={{ fontWeight: '700' }}>• email and domain service providers such as GoDaddy</Text> or email infrastructure used for communications.</Text>
                </View>

                <Text style={[styles.leadText, { marginBottom: 0 }]}>
                  We require, through contractual or comparable arrangements where appropriate, that such providers process personal data only for defined purposes, implement reasonable security measures, and comply with applicable data protection obligations.
                </Text>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.3 Independent third-party controllers</Text>
                <Text style={styles.leadText}>
                  Certain third parties act as independent data controllers, meaning they determine how and why personal data is processed independently.
                </Text>

                <Text style={styles.leadText}>This may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• payment service providers,</Text>
                  <Text style={styles.listItem}>• payout platforms,</Text>
                  <Text style={styles.listItem}>• certain analytics or advertising platforms.</Text>
                </View>

                <Text style={styles.leadText}>When interacting with such services:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• your data may be subject to their own privacy policies,</Text>
                  <Text style={styles.listItem}>• they may process data for their own compliance, regulatory, or operational purposes.</Text>
                </View>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.4 Advertising, analytics, and tracking partners</Text>
                <Text style={styles.leadText}>
                  We may allow certain data to be collected through:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• cookies,</Text>
                  <Text style={styles.listItem}>• pixels,</Text>
                  <Text style={styles.listItem}>• SDKs,</Text>
                  <Text style={styles.listItem}>• tags and similar technologies.</Text>
                </View>

                <Text style={styles.leadText}>These may be used by analytics and advertising partners to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• measure usage and performance,</Text>
                  <Text style={styles.listItem}>• understand user behavior,</Text>
                  <Text style={styles.listItem}>• support advertising and campaign effectiveness,</Text>
                  <Text style={styles.listItem}>• enable remarketing or retargeting,</Text>
                  <Text style={styles.listItem}>• perform attribution and reporting.</Text>
                </View>

                <Text style={styles.leadText}>This typically involves:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• device identifiers,</Text>
                  <Text style={styles.listItem}>• browser or app-level data,</Text>
                  <Text style={styles.listItem}>• interaction events,</Text>
                  <Text style={styles.listItem}>• cookie or tracking identifiers.</Text>
                </View>

                <Text style={styles.leadText}>
                  We do not upload direct customer lists (such as email address or phone number databases) to advertising platforms for custom audience targeting unless we have an appropriate legal basis to do so and have provided any notice or obtained any consent required under applicable law.
                </Text>

                <Text style={styles.leadText}>Where required by applicable law, such tracking is enabled only after obtaining your consent.</Text>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.5 Payment, payout, and verification partners</Text>
                <Text style={styles.leadText}>
                  We share personal data with payment, payout, and verification providers to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• process transactions,</Text>
                  <Text style={styles.listItem}>• validate payment or payout details,</Text>
                  <Text style={styles.listItem}>• verify identity or tax-related information,</Text>
                  <Text style={styles.listItem}>• execute payouts,</Text>
                  <Text style={styles.listItem}>• maintain financial and audit records.</Text>
                </View>

                <Text style={styles.leadText}>This may include sharing:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• transaction identifiers and payment status,</Text>
                  <Text style={styles.listItem}>• payout-related details (such as bank account, UPI, or payout email),</Text>
                  <Text style={styles.listItem}>• verification inputs such as PAN or bank validation data (where applicable),</Text>
                  <Text style={styles.listItem}>• payout processing and delivery status.</Text>
                </View>

                <Text style={styles.leadText}>For international payouts, we typically share limited information such as name, payout email, and country with payout providers such as Tremendous.</Text>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.6 Analytics, internal reporting, and business insights</Text>
                <Text style={styles.leadText}>
                  We may process and analyze personal data using internal tools and platforms (including business intelligence systems) to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• understand customer behavior,</Text>
                  <Text style={styles.listItem}>• evaluate performance and engagement,</Text>
                  <Text style={styles.listItem}>• support decision-making,</Text>
                  <Text style={styles.listItem}>• improve services and offerings.</Text>
                </View>

                <Text style={styles.leadText}>Such analysis may involve user-level data or aggregated data, depending on the purpose. Where feasible, we aim to use aggregated or non-identifiable data for broader analysis.</Text>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.7 Communications and messaging providers</Text>
                <Text style={styles.leadText}>
                  We use communication service providers (such as MSG91 and related messaging infrastructure) to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• send service-related messages (such as login or transaction updates),</Text>
                  <Text style={styles.listItem}>• send notifications related to referrals, payouts, or account activity,</Text>
                  <Text style={styles.listItem}>• communicate updates, offers, or marketing messages where permitted.</Text>
                </View>

                <Text style={styles.leadText}>These providers may process data such as phone numbers, message content, and delivery status as part of providing messaging services.</Text>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.8 Video delivery and content protection</Text>
                <Text style={styles.leadText}>
                  We use specialized video delivery and DRM providers (such as VdoCipher) to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• deliver protected video content,</Text>
                  <Text style={styles.listItem}>• manage access control and streaming,</Text>
                  <Text style={styles.listItem}>• enforce content protection measures.</Text>
                </View>

                <Text style={styles.leadText}>This may involve sharing:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• user/session identifiers,</Text>
                  <Text style={styles.listItem}>• device or playback-related data,</Text>
                  <Text style={styles.listItem}>• access control information.</Text>
                </View>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.9 Professional advisors and compliance partners</Text>
                <Text style={styles.leadText}>
                  We may share personal data with professional advisors and service providers where necessary for:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• accounting, auditing, and financial compliance,</Text>
                  <Text style={styles.listItem}>• tax filings and reporting,</Text>
                  <Text style={styles.listItem}>• legal advice and regulatory compliance.</Text>
                </View>

                <Text style={styles.leadText}>This may include sharing data with:</Text>
                <Text style={styles.leadText}>professional advisors, including auditors, accountants, tax consultants, and legal advisors engaged for compliance and regulatory purposes.</Text>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.10 Legal obligations and regulatory disclosures</Text>
                <Text style={[styles.leadText, { marginBottom: 8 }]}>
                  We may disclose personal data where required to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• comply with applicable laws and regulations,</Text>
                  <Text style={styles.listItem}>• respond to lawful requests from government authorities, regulators, or law enforcement,</Text>
                  <Text style={styles.listItem}>• fulfill tax, financial reporting, or compliance obligations.</Text>
                </View>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.11 Protection of rights and platform integrity</Text>
                <Text style={styles.leadText}>
                  We may disclose personal data where necessary to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• enforce our Terms of Use and policies,</Text>
                  <Text style={styles.listItem}>• detect, prevent, or investigate fraud, abuse, or misuse,</Text>
                  <Text style={styles.listItem}>• protect the rights, property, or safety of our company, users, or third parties,</Text>
                  <Text style={styles.listItem}>• resolve disputes or respond to claims.</Text>
                </View>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.12 Business transfers and restructuring</Text>
                <Text style={[styles.leadText, { marginBottom: 9 }]}>
                  In the event of:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• merger,</Text>
                  <Text style={styles.listItem}>• acquisition,</Text>
                  <Text style={styles.listItem}>• restructuring,</Text>
                  <Text style={styles.listItem}>• investment,</Text>
                  <Text style={styles.listItem}>• sale of assets,</Text>
                </View>
                <Text style={styles.leadText}>personal data may be transferred as part of such transaction, subject to appropriate confidentiality and legal safeguards.</Text>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.13 Internal access within our organization</Text>
                <Text style={styles.leadText}>
                  Personal data may be accessed by authorized personnel within our organization on a need-to-know basis, including teams responsible for:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• customer support,</Text>
                  <Text style={styles.listItem}>• operations and platform management,</Text>
                  <Text style={styles.listItem}>• finance and payouts,</Text>
                  <Text style={styles.listItem}>• compliance and audit,</Text>
                  <Text style={styles.listItem}>• security and fraud prevention,</Text>
                  <Text style={styles.listItem}>• marketing and analytics.</Text>
                </View>
                <Text style={[styles.leadText, { marginBottom: 5 }]}>Access is controlled based on role and purpose.</Text>

                <Text style={[styles.subHeading, { marginTop: 18 }]}>4.14 No uncontrolled third-party disclosure</Text>
                <Text style={[styles.leadText, { marginBottom: 8 }]}>We do not:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• share personal data with unrelated third parties for their independent marketing use without a valid legal basis,</Text>
                  <Text style={styles.listItem}>• disclose personal data beyond what is necessary for the purposes described in this Privacy Policy.</Text>
                </View>
                <Text style={styles.leadText}>We do not sell personal data to third parties.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('5')}>
              <Text style={styles.sectionHeader}>5. International Data Transfers</Text>
            </TouchableOpacity>
            {expandedSections['5'] && (
              <>
                <Text style={styles.subHeading}>5.1 Overview</Text>
                <Text style={[styles.leadText, { marginBottom: 8 }]}>
                  We operate a digital platform that may be accessed by users across multiple jurisdictions. As part of providing our services, personal data may be processed, stored, or accessed in different countries depending on:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• your location,</Text>
                  <Text style={styles.listItem}>• our infrastructure and hosting arrangements,</Text>
                  <Text style={styles.listItem}>• the location of our service providers,</Text>
                  <Text style={styles.listItem}>• the nature of services used, such as payments, payouts, analytics, messaging, or video delivery.</Text>
                </View>

                <Text style={styles.subHeading}>5.2 Primary processing and cross-border nature</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>We aim to primarily process and store personal data using infrastructure located in India.</Text>
                <Text style={styles.leadText}>However, due to the nature of digital services and integrated technologies, personal data may also be processed in other jurisdictions where our service providers or technology partners operate.</Text>
                <Text style={styles.leadText}>These jurisdictions may include countries outside India, including regions where data protection laws may differ from those in your country of residence.</Text>

                <Text style={styles.subHeading}>5.3 Transfers through service providers</Text>
                <Text style={styles.leadText}>Personal data may be transferred internationally where necessary to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• process payments through providers such as Razorpay, Cashfree, or PayPal,</Text>
                  <Text style={styles.listItem}>• process international payouts through providers such as Tremendous (which may operate in the United States or other regions),</Text>
                  <Text style={styles.listItem}>• support analytics, performance monitoring, and infrastructure services through providers such as Google or Microsoft,</Text>
                  <Text style={styles.listItem}>• deliver content and services through systems such as video delivery platforms or messaging infrastructure.</Text>
                </View>
                <Text style={styles.leadText}>These transfers are part of the normal operation of our services.</Text>

                <Text style={styles.subHeading}>5.4 Safeguards for international transfers</Text>
                <Text style={styles.leadText}>Where personal data is transferred across borders, we take reasonable steps to ensure that such transfers are subject to appropriate safeguards.</Text>
                <Text style={styles.leadText}>These may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• contractual arrangements with service providers,</Text>
                  <Text style={styles.listItem}>• data protection and confidentiality obligations,</Text>
                  <Text style={styles.listItem}>• vendor selection based on security and reliability considerations,</Text>
                  <Text style={styles.listItem}>• limiting access to personal data based on role and purpose,</Text>
                  <Text style={styles.listItem}>• applying appropriate technical and organizational measures.</Text>
                </View>
                <Text style={styles.leadText}>Where required by applicable law, we rely on legally permitted transfer mechanisms and safeguards.</Text>

                <Text style={styles.subHeading}>5.5 Transfers for global users</Text>
                <Text style={styles.leadText}>If you access our services from outside India, your personal data may be transferred to and processed in India and in other jurisdictions where our service providers operate, to the extent necessary for the operation of our services and in accordance with this Privacy Policy.</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>Where required by applicable law, we implement appropriate safeguards or rely on legally recognized transfer mechanisms for such cross-border processing. Your use of the services does not by itself replace any transfer mechanism or safeguard required by law.</Text>

                <Text style={styles.subHeading}>5.6 Third-party environments and limitations</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>When personal data is processed by third-party service providers, such providers may operate under their own technical, operational, and legal frameworks, and certain aspects of their processing may be governed by their own privacy policies and compliance obligations. We select providers carefully and aim to implement appropriate safeguards, contractual protections, and oversight measures as described in this Policy.</Text>

                <Text style={styles.subHeading}>5.7 No restriction to a single jurisdiction</Text>
                <Text style={styles.leadText}>Due to the nature of cloud infrastructure, global services, and platform integrations, personal data may be stored or processed in one or more jurisdictions depending on system architecture, service configuration, vendor operations, and user location.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('6')}>
              <Text style={styles.sectionHeader}>6. Data Retention</Text>
            </TouchableOpacity>
            {expandedSections['6'] && (
              <>
                <Text style={styles.leadText}>
                  The Company retains personal data only for as long as necessary to fulfill the purposes for which it was collected, including to provide services, comply with legal obligations, resolve disputes, enforce agreements, and maintain security. Retention periods vary depending on the nature of the data and applicable legal requirements.
                </Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>
                  Retention periods are determined based on the nature of the data, the purpose for which it is processed, applicable legal and regulatory requirements, contractual obligations, and the need to resolve disputes, enforce agreements, and maintain security.
                  {'\n'}
                </Text>
                <Text style={styles.subHeading}>6.1 Financial, Transactional, and Compliance Records</Text>
                <Text style={styles.leadText}>
                  Personal data related to payments, invoices, referrals, payouts, taxation (including PAN where applicable), and financial transactions may be retained for up to 8 years or such longer period as required under applicable tax, accounting, or legal obligations.
                </Text>

                <Text style={styles.subHeading}>6.2 Account and Service Data</Text>
                <Text style={styles.leadText}>
                  Personal data associated with user accounts, program access, and service usage is retained for as long as the account remains active and for a reasonable period thereafter to support user requests, dispute resolution, and legal compliance.
                </Text>

                <Text style={styles.subHeading}>6.3 Security, Access, and System Logs</Text>
                <Text style={styles.leadText}>
                  Authentication records, login attempts, device information, and system security logs are typically retained for a limited operational period generally not exceeding 6 to 12 months, unless extended retention is necessary for fraud prevention, investigation, legal claims, or regulatory compliance.
                </Text>

                <Text style={styles.subHeading}>6.4 Analytics and Usage Data</Text>
                <Text style={styles.leadText}>
                  Aggregated and individual analytics data used for performance improvement, product optimization, and statistical analysis is typically retained for up to 24 months, after which it may be anonymized or deleted.
                </Text>

                <Text style={styles.subHeading}>6.5 Communication and Support Data</Text>
                <Text style={styles.leadText}>
                  Customer support communications, queries, and service-related interactions may be retained for a reasonable period necessary to resolve issues, maintain service quality, and comply with legal obligations.
                </Text>

                <Text style={styles.subHeading}>6.6 Testimonials, Feedback, and Media Content</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• <Text style={{ fontWeight: '700' }}>Internal Review Data:</Text> Feedback submissions, including optional child-related data or media, may be retained internally for evaluation, research, and program improvement for a limited and proportionate duration.</Text>
                  <Text style={styles.listItem}>• <Text style={{ fontWeight: '700' }}>Public Marketing Content:</Text> Testimonials, images, videos, or child-related content used for marketing or public display are retained only where such use has been clearly disclosed at the time of submission and acknowledged by the user, and may remain in use until such authorization is withdrawn or otherwise limited, subject to practical limitations (e.g., content already published or distributed).</Text>
                </View>

                <Text style={styles.subHeading}>6.7 Legal Claims, Disputes, and Enforcement</Text>
                <Text style={styles.leadText}>
                  Data necessary for establishing, exercising, or defending legal claims, preventing fraud, enforcing agreements, or complying with regulatory obligations may be retained for longer periods as required by applicable law.
                </Text>

                <Text style={styles.subHeading}>6.8 Deletion and Retention Practices</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• User-facing personal data may be deleted, corrected, or updated upon user request, subject to verification and applicable legal limitations.</Text>
                  <Text style={styles.listItem}>• Certain data may be retained even after account deletion where required for legal, regulatory, audit, fraud prevention, or contractual purposes.</Text>
                  <Text style={styles.listItem}>• The Company currently performs manual and system-assisted data management processes, and continues to improve automated retention and deletion mechanisms over time.</Text>
                </View>

                <Text style={styles.leadText}>
                  The Company periodically reviews retention practices to ensure compliance with applicable data protection laws, including GDPR and Indian data protection requirements.
                </Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('7')}>
              <Text style={styles.sectionHeader}>7. Data Security</Text>
            </TouchableOpacity>
            {expandedSections['7'] && (
              <>
                <Text style={styles.subHeading}>7.1 Overview</Text>
                <Text style={styles.leadText}>
                  We implement and are designed to maintain appropriate technical and organizational measures to protect personal data against:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• unauthorized access,</Text>
                  <Text style={styles.listItem}>• accidental loss,</Text>
                  <Text style={styles.listItem}>• misuse,</Text>
                  <Text style={styles.listItem}>• alteration, or</Text>
                  <Text style={styles.listItem}>• unauthorized disclosure.</Text>
                </View>

                <Text style={styles.leadText}>
                  Our approach to security takes into account the nature of the data, the risks involved, and generally accepted industry practices.
                </Text>

                <Text style={styles.leadText}>
                  In case of a personal data breach, users may contact support@allrounderbaby.com for information or assistance, subject to applicable legal requirements.
                </Text>

                <Text style={styles.leadText}>
                  Key decisions affecting users are subject to human review and are not based solely on automated processing.
                </Text>

                <Text style={styles.subHeading}>7.2 Secure transmission and data protection</Text>
                <Text style={styles.leadText}>
                  We use secure communication protocols (such as HTTPS) to protect data transmitted between your device and our platform.
                </Text>
                <Text style={styles.leadText}>
                  Where applicable, data stored within our systems or through infrastructure providers may be protected using security features and safeguards provided by such platforms.
                </Text>

                <Text style={styles.subHeading}>7.3 Access control and internal handling</Text>
                <Text style={styles.leadText}>
                  Access to personal data is restricted to authorized personnel on a need-to-know basis.
                </Text>
                <Text style={styles.leadText}>We aim to ensure that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• access is limited to individuals responsible for specific functions (such as support, operations, or finance),</Text>
                  <Text style={styles.listItem}>• data is accessed only for legitimate business purposes,</Text>
                  <Text style={styles.listItem}>• internal handling of data is subject to operational controls and oversight.</Text>
                </View>

                <Text style={styles.subHeading}>7.4 Authentication and account security</Text>
                <Text style={styles.leadText}>
                  We implement measures to protect user accounts and prevent unauthorized access, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• OTP-based authentication mechanisms,</Text>
                  <Text style={styles.listItem}>• limits on login attempts within defined time periods,</Text>
                  <Text style={styles.listItem}>• session and access controls,</Text>
                  <Text style={styles.listItem}>• monitoring of suspicious login activity.</Text>
                </View>
                <Text style={styles.leadText}>
                  Users are responsible for maintaining the confidentiality of their access methods and ensuring secure use of their accounts.
                </Text>

                <Text style={styles.subHeading}>7.5 Device and access controls</Text>
                <Text style={styles.leadText}>
                  We implement device and access-related controls to reduce unauthorized usage, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• limiting the number of devices that may access an account at a given time,</Text>
                  <Text style={styles.listItem}>• requiring additional verification or manual intervention when device limits are exceeded,</Text>
                  <Text style={styles.listItem}>• monitoring account usage patterns to detect unusual access behavior.</Text>
                </View>

                <Text style={styles.subHeading}>7.6 Platform and content protection</Text>
                <Text style={styles.leadText}>
                  We implement measures to protect digital content and platform access, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• controlled access to purchased content,</Text>
                  <Text style={styles.listItem}>• restrictions on unauthorized sharing or misuse,</Text>
                  <Text style={styles.listItem}>• use of video protection and digital rights management (DRM) technologies through service providers such as VdoCipher.</Text>
                </View>

                <Text style={styles.subHeading}>7.7 Monitoring and risk management</Text>
                <Text style={styles.leadText}>
                  We may monitor system activity and usage patterns to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• detect potential security incidents,</Text>
                  <Text style={styles.listItem}>• identify suspicious or fraudulent behavior,</Text>
                  <Text style={styles.listItem}>• protect platform integrity and user accounts.</Text>
                </View>

                <Text style={styles.leadText}>
                  This may include analysis of:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• login patterns,</Text>
                  <Text style={styles.listItem}>• device or session data,</Text>
                  <Text style={styles.listItem}>• transaction or payout-related activity.</Text>
                </View>

                <Text style={styles.subHeading}>7.8 Vendor and infrastructure security</Text>
                <Text style={styles.leadText}>
                  We rely on established service providers for key components of our infrastructure and operations, including:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• hosting and cloud infrastructure providers,</Text>
                  <Text style={styles.listItem}>• payment and payout platforms,</Text>
                  <Text style={styles.listItem}>• video delivery and DRM systems,</Text>
                  <Text style={styles.listItem}>• communication and messaging services.</Text>
                </View>
                <Text style={styles.leadText}>
                  We aim to work with providers that implement appropriate security measures. However, such providers operate under their own systems and policies.
                </Text>

                <Text style={styles.subHeading}>7.9 Incident handling and response</Text>
                <Text style={styles.leadText}>
                  We take security incidents seriously and aim to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• investigate potential incidents,</Text>
                  <Text style={styles.listItem}>• take appropriate corrective actions,</Text>
                  <Text style={styles.listItem}>• mitigate risks and prevent recurrence.</Text>
                </View>
                <Text style={styles.leadText}>
                  Where required under applicable law, we may notify affected users and/or relevant authorities in connection with certain types of data breaches or security incidents.
                </Text>

                <Text style={styles.subHeading}>7.10 Data minimization and responsible handling</Text>
                <Text style={styles.leadText}>
                  We aim to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• collect only data necessary for defined purposes,</Text>
                  <Text style={styles.listItem}>• limit unnecessary access to personal data,</Text>
                  <Text style={styles.listItem}>• handle personal data in a manner consistent with this Privacy Policy.</Text>
                </View>

                <Text style={styles.subHeading}>7.11 Limitations of security</Text>
                <Text style={styles.leadText}>
                  While we take reasonable steps to protect personal data, no system can guarantee absolute security. Transmission of data over the internet involves inherent risks. Users should take appropriate precautions when accessing online services. We cannot guarantee complete security of data at all times.
                </Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('8')}>
              <Text style={styles.sectionHeader}>8. Your Rights and Choices</Text>
            </TouchableOpacity>
            {expandedSections['8'] && (
              <>
                <Text style={styles.subHeading}>8.1 Overview</Text>
                <Text style={styles.leadText}>
                  Depending on your location and applicable law, you may have certain rights in relation to your personal data. These rights may include, where applicable:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• the right to access your personal data;</Text>
                  <Text style={styles.listItem}>• the right to correct or update inaccurate data;</Text>
                  <Text style={styles.listItem}>• the right to request deletion or erasure of certain data;</Text>
                  <Text style={styles.listItem}>• the right to restrict or object to certain processing;</Text>
                  <Text style={styles.listItem}>• the right to withdraw consent where processing is based on consent;</Text>
                  <Text style={styles.listItem}>• the right to data portability;</Text>
                  <Text style={styles.listItem}>• the right to manage marketing preferences; and</Text>
                  <Text style={styles.listItem}>• the right to lodge a complaint with a competent data protection authority or other regulator, where such right is available under applicable law.</Text>
                </View>

                <Text style={styles.leadText}>
                  These rights are not absolute and may be subject, where permitted by applicable law, to legal obligations, contractual requirements, technical feasibility, legitimate interests, fraud prevention needs, and the rights of others.
                </Text>

                <Text style={styles.leadText}>
                  You may request deletion of your data; however, certain data may be retained where required for legal, compliance, fraud prevention, audit, contractual, security, or record-keeping purposes.
                </Text>

                <Text style={styles.subHeading}>8.2 Right to access your data</Text>
                <Text style={styles.leadText}>You may request access to personal data we hold about you.</Text>
                <Text style={styles.leadText}>This may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• account and profile data,</Text>
                  <Text style={styles.listItem}>• transaction and payout-related data,</Text>
                  <Text style={styles.listItem}>• referral and program participation data,</Text>
                  <Text style={styles.listItem}>• feedback or testimonial data submitted by you.</Text>
                </View>
                <Text style={styles.leadText}>We may provide:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• a copy of your data, or</Text>
                  <Text style={styles.listItem}>• a structured summary of relevant information,</Text>
                </View>
                <Text style={styles.leadText}>subject to applicable legal requirements and verification of identity.</Text>

                <Text style={styles.subHeading}>8.3 Right to correct or update data</Text>
                <Text style={styles.leadText}>You may:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• update or correct your personal data through your account where available,</Text>
                  <Text style={styles.listItem}>• request correction of inaccurate or incomplete information.</Text>
                </View>
                <Text style={styles.leadText}>
                  Certain updates, particularly those relating to payout or verification data, may be subject to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• validation checks,</Text>
                  <Text style={styles.listItem}>• verification requirements,</Text>
                  <Text style={styles.listItem}>• system controls such as update limits, cooldown periods, or restricted edit frequency, to prevent fraud, misuse, or errors.</Text>
                </View>

                <Text style={styles.subHeading}>8.4 Right to request deletion</Text>
                <Text style={styles.leadText}>You may request deletion of your personal data.</Text>
                <Text style={styles.leadText}>Upon such request:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• profile data and optional information may be deleted or anonymized where feasible.</Text>
                </View>
                <Text style={styles.leadText}>
                  However, certain data may be retained where necessary for:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• legal obligations (including tax and financial record-keeping),</Text>
                  <Text style={styles.listItem}>• audit and compliance requirements,</Text>
                  <Text style={styles.listItem}>• fraud prevention and security,</Text>
                  <Text style={styles.listItem}>• dispute resolution or enforcement of agreements.</Text>
                </View>
                <Text style={styles.leadText}>
                  As a result, data such as:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• transaction records,</Text>
                  <Text style={styles.listItem}>• payout records,</Text>
                  <Text style={styles.listItem}>• invoices,</Text>
                  <Text style={styles.listItem}>• audit logs,</Text>
                </View>
                <Text style={styles.leadText}>
                  may continue to be retained even after deletion requests.
                </Text>
                <Text style={styles.leadText}>
                  This means that, where applicable, you may ask us to delete or erase profile-facing and optional data associated with your account, while understanding that we may still retain certain records where required or permitted for legal, tax, accounting, audit, security, anti-fraud, payout, evidentiary, or dispute-resolution purposes.
                </Text>
                <Text style={styles.subHeading}>8.5 Right to restrict or object to processing</Text>
                <Text style={styles.leadText}>
                  You may have the right to:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• request restriction of certain processing activities,</Text>
                  <Text style={styles.listItem}>• object to processing based on legitimate interests,</Text>
                </View>
                <Text style={styles.leadText}>
                  including certain types of:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• marketing,</Text>
                  <Text style={styles.listItem}>• profiling,</Text>
                  <Text style={styles.listItem}>• analytics (where applicable).</Text>
                </View>
                <Text style={styles.leadText}>
                  We will evaluate such requests in accordance with applicable law.
                </Text>
                <Text style={styles.leadText}>
                  However, certain processing may continue where necessary for:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• service delivery,</Text>
                  <Text style={styles.listItem}>• contractual obligations,</Text>
                  <Text style={styles.listItem}>• legal compliance,</Text>
                  <Text style={styles.listItem}>• security and fraud prevention.</Text>
                </View>

                <Text style={styles.subHeading}>8.6 Marketing preferences and opt-out</Text>
                <Text style={styles.leadText}>
                  You may opt out of marketing communications at any time by:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• using unsubscribe links,</Text>
                  <Text style={styles.listItem}>• adjusting account settings where available,</Text>
                  <Text style={styles.listItem}>• contacting us directly.</Text>
                </View>
                <Text style={styles.leadText}>
                  After opting out:
                </Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• you will no longer receive marketing communications,</Text>
                  <Text style={styles.listItem}>• however, you may continue to receive service-related communications such as:
                  </Text>
                  <View style={styles.list}>
                    <Text style={styles.listItem}>• account updates,</Text>
                    <Text style={styles.listItem}>• transaction notifications,</Text>
                    <Text style={styles.listItem}>• payout or referral-related updates,</Text>
                    <Text style={styles.listItem}>• security alerts.</Text>
                  </View>
                </View>

                <Text style={styles.subHeading}>8.7 Cookies and tracking choices</Text>
                <Text style={styles.leadText}>
                  Non-essential cookies, analytics, and tracking technologies are activated only after obtaining your explicit consent through a cookie banner or similar mechanism, where required by applicable law.
                </Text>
                <Text style={styles.leadText}>
                  Essential cookies required for platform functionality may be used without consent.
                </Text>

                <Text style={styles.subHeading}>8.8 Withdrawal of consent</Text>
                <Text style={styles.leadText}>
                  Where processing is based on consent, you may withdraw your consent at any time.
                </Text>
                <Text style={styles.leadText}>
                  Withdrawal of consent:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• does not affect processing already carried out,</Text>
                  <Text style={styles.listItem}>•may impact your ability to use certain features or services.</Text>
                </View>
                <Text style={styles.leadText}>
                  This includes consent or authorization associated with testimonials, feedback, images, audio, or videos submitted through clearly disclosed submission workflows, subject to applicable law and the practical limitations described in this Privacy Policy.
                </Text>
                <Text style={styles.subHeading}>8.9 Testimonials, feedback, and media content</Text>
                <Text style={styles.leadText}>If you have submitted:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• feedback,</Text>
                  <Text style={styles.listItem}>• testimonial content,</Text>
                  <Text style={styles.listItem}>• images, audio, or videos,</Text>
                </View>

                <Text style={styles.leadText}>you may request:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• restriction of further use,</Text>
                  <Text style={styles.listItem}>• removal from future use where feasible.</Text>
                </View>

                <Text style={styles.leadText}>However:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• content already used in campaigns, advertisements, or public materials may not always be immediately removable,</Text>
                  <Text style={styles.listItem}>• content shared or distributed on third-party platforms (such as social media) may be outside our direct control,</Text>
                  <Text style={styles.listItem}>• removal requests may be subject to:</Text>
                  <View style={{ paddingLeft: 18 }}>
                    <Text style={styles.listItem}>◦ the terms of the authorization provided through the clearly disclosed submission workflow,</Text>
                    <Text style={styles.listItem}>◦ technical feasibility,</Text>
                    <Text style={styles.listItem}>◦ audit or legal retention requirements,</Text>
                    <Text style={styles.listItem}>◦ payout or program-related conditions,</Text>
                  </View>
                </View>

                <Text style={styles.leadText}>We will review such requests on a case-by-case basis.</Text>

                <Text style={styles.subHeading}>8.10 Right to data portability</Text>
                <Text style={styles.leadText}>Where applicable law provides such a right, you may request your personal data in a structured, commonly used, and machine-readable format, where technically feasible.</Text>

                <Text style={styles.subHeading}>8.11 Exercising your rights</Text>
                <Text style={styles.leadText}>We aim to respond to valid requests within a reasonable period and, where applicable law requires, within prescribed statutory timelines.</Text>
                <Text style={styles.leadText}>To exercise your rights, you may contact us at:</Text>
                <Text style={styles.leadText}>support@allrounderbaby.com</Text>
                <Text style={styles.leadText}>We may:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• request identity verification,</Text>
                  <Text style={styles.listItem}>• require additional information to process your request,</Text>
                  <Text style={styles.listItem}>• decline or limit requests where permitted by applicable law.</Text>
                </View>
                <Text style={styles.subHeading}>8.12 Limitations and misuse prevention</Text>
                <Text style={styles.leadText}>Requests may be limited or declined where:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• they are repetitive or excessive,</Text>
                  <Text style={styles.listItem}>• they are technically infeasible,</Text>
                  <Text style={styles.listItem}>• they would impact the rights of others,</Text>
                  <Text style={styles.listItem}>• they interfere with legal, audit, or compliance obligations,</Text>
                  <Text style={styles.listItem}>• they are suspected to be abusive or intended to misuse platform processes.</Text>
                </View>

                <Text style={styles.subHeading}>8.13 Right to lodge a complaint</Text>
                <Text style={styles.leadText}>Where provided by applicable law, you may lodge a complaint with a competent data protection authority, supervisory authority, or other regulator if you believe our processing of your personal data violates applicable law. We encourage you to contact us first at support@allrounderbaby.com so we can try to resolve your concern directly.</Text>

              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('9')}>
              <Text style={styles.sectionHeader}>9. Cookies and Tracking Technologies</Text>
            </TouchableOpacity>
            {expandedSections['9'] && (
              <>
                <Text style={styles.subHeading}>9.1 Overview</Text>
                <Text style={styles.leadText}>We use cookies and similar technologies to operate, secure, analyze, and improve our services, as well as to support advertising and marketing activities.</Text>

                <Text style={styles.leadText}>These technologies may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• cookies,</Text>
                  <Text style={styles.listItem}>• pixels,</Text>
                  <Text style={styles.listItem}>• tags,</Text>
                  <Text style={styles.listItem}>• SDKs,</Text>
                  <Text style={styles.listItem}>• local storage,</Text>
                  <Text style={styles.listItem}>• and similar tracking tools.</Text>
                </View>

                <Text style={styles.leadText}>They may be used across our:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• website,</Text>
                  <Text style={styles.listItem}>• mobile applications,</Text>
                  <Text style={styles.listItem}>• and integrated services.</Text>
                </View>
                <Text style={styles.subHeading}>9.2 What are cookies</Text>
                <Text style={styles.leadText}>Cookies are small data files stored on your device when you visit a website or use an application.</Text>

                <Text style={styles.leadText}>They help:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• enable core platform functionality,</Text>
                  <Text style={styles.listItem}>• remember preferences and settings,</Text>
                  <Text style={styles.listItem}>• understand how users interact with services,</Text>
                  <Text style={styles.listItem}>• support analytics and advertising activities.</Text>
                </View>

                <Text style={styles.subHeading}>9.3 Types of cookies and tracking technologies</Text>
                <Text style={styles.leadText}>We use different categories of cookies and similar technologies:</Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(a) Necessary cookies</Text>
                <Text style={styles.leadText}>These cookies are essential for the functioning of our platform.</Text>
                <Text style={styles.leadText}>They may be used to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• enable login and authentication,</Text>
                  <Text style={styles.listItem}>• maintain sessions,</Text>
                  <Text style={styles.listItem}>• support security and fraud prevention,</Text>
                  <Text style={styles.listItem}>• ensure core platform functionality.</Text>
                </View>
                <Text style={styles.leadText}>These cookies are used without requiring consent where permitted by applicable law.</Text>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(b) Functional cookies</Text>
                <Text style={styles.leadText}>These cookies help improve user experience by:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• remembering preferences,</Text>
                  <Text style={styles.listItem}>• supporting user settings,</Text>
                  <Text style={styles.listItem}>• enhancing usability of features.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(c) Analytics and performance technologies</Text>
                <Text style={styles.leadText}>These technologies help us:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• understand how users interact with our platform,</Text>
                  <Text style={styles.listItem}>• measure usage and engagement,</Text>
                  <Text style={styles.listItem}>• improve performance and functionality.</Text>
                </View>

                <Text style={[styles.leadText, { fontWeight: '700' }]}>(d) Advertising and marketing technologies</Text>
                <Text style={styles.leadText}>These technologies are used to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• measure campaign effectiveness,</Text>
                  <Text style={styles.listItem}>• build audiences for advertising,</Text>
                  <Text style={styles.listItem}>• enable remarketing or retargeting,</Text>
                  <Text style={styles.listItem}>• deliver relevant advertisements,</Text>
                  <Text style={styles.listItem}>• track conversions and attribution.</Text>
                </View>
                <Text style={styles.subHeading}>9.4 Third-party tracking technologies</Text>
                <Text style={styles.leadText}>We may use or integrate third-party tools and services that use cookies or similar technologies.</Text>
                <Text style={styles.leadText}>These may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• analytics providers such as Google Analytics or Firebase,</Text>
                  <Text style={styles.listItem}>• advertising platforms such as Google Ads and Meta (Facebook/Instagram),</Text>
                  <Text style={styles.listItem}>• messaging and communication providers such as MSG91,</Text>
                  <Text style={styles.listItem}>• video delivery and DRM providers such as VdoCipher,</Text>
                  <Text style={styles.listItem}>• payment and infrastructure providers where relevant to functionality.</Text>
                </View>
                <Text style={styles.leadText}>These third parties may collect and process data in accordance with their own privacy policies.</Text>

                <Text style={styles.subHeading}>9.5 Tracking in mobile applications</Text>
                <Text style={styles.leadText}>Within our mobile applications, we may use SDKs and similar technologies to collect data such as:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• app usage and interaction data,</Text>
                  <Text style={styles.listItem}>• device identifiers or app instance identifiers,</Text>
                  <Text style={styles.listItem}>• performance and crash-related information,</Text>
                  <Text style={styles.listItem}>• video playback and interaction data (including through video delivery systems such as VdoCipher).</Text>
                </View>
                <Text style={styles.subHeading}>9.6 Consent for cookies and tracking</Text>
                <Text style={styles.leadText}>For cookies and tracking technologies that are not strictly necessary:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• we obtain your consent before enabling such technologies where required by applicable law,</Text>
                  <Text style={styles.listItem}>• analytics, advertising, and remarketing technologies are activated only after consent is provided,</Text>
                  <Text style={styles.listItem}>• you may accept, reject, or customize your preferences through our cookie consent interface.</Text>
                </View>

                <Text style={styles.subHeading}>9.7 Personalization and cross-platform tracking</Text>
                <Text style={styles.leadText}>We may use tracking technologies to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• personalize content and user experience,</Text>
                  <Text style={styles.listItem}>• analyze behavior across sessions or devices,</Text>
                  <Text style={styles.listItem}>• support cross-platform advertising and attribution,</Text>
                  <Text style={styles.listItem}>• optimize campaign performance and user engagement.</Text>
                </View>
                <Text style={styles.subHeading}>9.8 Managing your preferences</Text>
                <Text style={styles.leadText}>You can manage your preferences for cookies and tracking technologies by:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• using our cookie consent banner or settings interface,</Text>
                  <Text style={styles.listItem}>• adjusting your browser settings,</Text>
                  <Text style={styles.listItem}>• using device-level privacy controls where applicable.</Text>
                </View>
                <Text style={styles.leadText}>You may also withdraw your consent at any time.</Text>

                <Text style={styles.subHeading}>9.9 Withdrawal of consent</Text>
                <Text style={styles.leadText}>If you withdraw your consent:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• non-essential tracking will be disabled for future interactions,</Text>
                  <Text style={styles.listItem}>• certain functionality or personalization may be affected,</Text>
                  <Text style={styles.listItem}>• previously collected data may continue to be used where permitted by applicable law.</Text>
                </View>
                <Text style={styles.subHeading}>9.10 Duration of cookies</Text>
                <Text style={styles.leadText}>Cookies and similar technologies may be:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• session-based, which expire when you close your browser or app, or</Text>
                  <Text style={styles.listItem}>• persistent, which remain on your device for a defined period.</Text>
                </View>
                <Text style={styles.leadText}>The duration depends on:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• the purpose of the technology,</Text>
                  <Text style={styles.listItem}>• system configuration,</Text>
                  <Text style={styles.listItem}>• and third-party provider settings.</Text>
                </View>

                <Text style={styles.subHeading}>9.11 Limitations of tracking technologies</Text>
                <Text style={styles.leadText}>We do not use cookies or similar technologies to access sensitive information stored on your device, such as:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• contacts,</Text>
                  <Text style={styles.listItem}>• personal files,</Text>
                  <Text style={styles.listItem}>• or unrelated device data.</Text>
                </View>
                <Text style={styles.subHeading}>9.12 Impact of disabling cookies</Text>
                <Text style={styles.leadText}>If you disable certain cookies or tracking technologies:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• some features of our platform may not function properly,</Text>
                  <Text style={styles.listItem}>• your experience may be less personalized,</Text>
                  <Text style={styles.listItem}>• certain services or features may become limited or unavailable.</Text>
                </View>

                <Text style={styles.subHeading}>9.13 Updates to tracking technologies</Text>
                <Text style={styles.leadText}>We may update or introduce new cookies or tracking technologies from time to time to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• improve functionality,</Text>
                  <Text style={styles.listItem}>• enhance analytics,</Text>
                  <Text style={styles.listItem}>• support new features,</Text>
                  <Text style={styles.listItem}>• improve advertising effectiveness.</Text>
                </View>
                <Text style={styles.leadText}>Where required, we will update consent mechanisms accordingly.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('10')}>
              <Text style={styles.sectionHeader}>10. Children’s Privacy</Text>
            </TouchableOpacity>
            {expandedSections['10'] && (
              <>
                <Text style={styles.subHeading}>10.1 Overview</Text>
                <Text style={styles.leadText}>Our services are designed for parents, guardians, and caregivers, particularly in relation to children in the 0–5 years age group.</Text>
                <Text style={styles.leadText}>We do not offer our services directly to children as independent users.</Text>

                <Text style={styles.subHeading}>10.2 Minimum age requirement</Text>
                <Text style={styles.leadText}>Our platform is intended for use by individuals who are at least 18 years of age.</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Only adults may create accounts, make purchases, or interact with our services,</Text>
                  <Text style={styles.listItem}>• children are not permitted to independently register, submit personal data, or enter into agreements through our platform.</Text>
                </View>
                <Text style={styles.subHeading}>10.3 Parent or guardian responsibility</Text>
                <Text style={styles.leadText}>Any personal data relating to a child is provided by a parent or guardian.</Text>
                <Text style={styles.leadText}>By submitting such information, you confirm that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• you are the parent, guardian, or authorized caregiver of the child,</Text>
                  <Text style={styles.listItem}>• you have the authority to provide such information,</Text>
                  <Text style={styles.listItem}>• you understand how such information may be used in accordance with this Privacy Policy.</Text>
                </View>
                <Text style={styles.leadText}>You are responsible for ensuring that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• the information shared is accurate and appropriate,</Text>
                  <Text style={styles.listItem}>• necessary permissions or authorizations have been obtained,</Text>
                  <Text style={styles.listItem}>• no unauthorized third-party child data is submitted.</Text>
                </View>
                <Text style={styles.subHeading}>10.4 Nature of child-related data</Text>
                <Text style={styles.leadText}>Child-related data may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• age or developmental stage,</Text>
                  <Text style={styles.listItem}>• parent-reported observations and feedback,</Text>
                  <Text style={styles.listItem}>• behavioral or contextual information,</Text>
                  <Text style={styles.listItem}>• optional uploaded content such as images, audio, or videos.</Text>
                </View>
                <Text style={styles.leadText}>Such data is treated as information submitted by the parent or guardian and not as data collected directly from the child.</Text>

                <Text style={styles.subHeading}>10.5 Voluntary nature of child data submission</Text>
                <Text style={styles.leadText}>Submission of child-related data is entirely voluntary.</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Child-related data is not required to access or use our core services,</Text>
                  <Text style={styles.listItem}>• Our primary service — access to pre-recorded video content — is not dependent on submission of child-related information,</Text>
                  <Text style={styles.listItem}>• Optional submissions may be made through secure, logged-in features such as feedback or testimonial workflows.</Text>
                </View>
                <Text style={styles.subHeading}>10.6 Use of child-related data</Text>
                <Text style={styles.leadText}>Child-related data may be used for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• service delivery (where relevant to feedback features),</Text>
                  <Text style={styles.listItem}>• feedback evaluation and program participation,</Text>
                  <Text style={styles.listItem}>• internal analysis, research, and program improvement,</Text>
                  <Text style={styles.listItem}>• aggregated insights and statistical analysis to understand overall effectiveness of programs.</Text>
                </View>
                <Text style={styles.leadText}>Where data is used for analysis or reporting, we aim to use aggregated or non-identifiable information where feasible.</Text>

                <Text style={styles.subHeading}>10.7 Use of child-related data for marketing</Text>
                <Text style={styles.leadText}>We do not automatically use child-related data for public marketing purposes.</Text>
                <Text style={styles.leadText}>However:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• we may use aggregated, anonymized, or statistical information derived from user data (including child-related data) to demonstrate program effectiveness,</Text>
                  <Text style={styles.listItem}>• we may use specific child-related content (including images or videos) for marketing, testimonials, or promotional purposes where such use has been clearly disclosed at the time of submission by the parent or guardian, and accepted as part of the submission process;</Text>
                </View>
                <Text style={styles.leadText}>Such authorization is obtained through clear and transparent disclosure at the point of submission, and is established through the parent’s or guardian’s acceptance of applicable policies during submission together with submission of the content within that disclosed workflow.</Text>

                <Text style={styles.subHeading}>10.8 Sharing of child-related data</Text>
                <Text style={styles.leadText}>Child-related data may be shared only where necessary for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• internal operations and evaluation,</Text>
                  <Text style={styles.listItem}>• service delivery and platform functionality,</Text>
                  <Text style={styles.listItem}>• processing through service providers involved in storage, hosting, or content delivery.</Text>
                </View>
                <Text style={styles.leadText}>We do not knowingly share child-related data with unrelated third parties for independent marketing purposes without a valid legal basis.</Text>

                <Text style={styles.subHeading}>10.9 Withdrawal and removal requests</Text>
                <Text style={styles.leadText}>Parents or guardians may request:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• removal of child-related content from future use,</Text>
                  <Text style={styles.listItem}>• restriction of further processing.</Text>
                </View>
                <Text style={styles.leadText}>However:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• content already used in campaigns, advertisements, or public materials may not always be immediately removable,</Text>
                  <Text style={styles.listItem}>• content shared or distributed through third-party platforms (such as social media) may be outside our direct control,</Text>
                  <Text style={styles.listItem}>• removal requests may be subject to:</Text>
                  <View style={{ paddingLeft: 18 }}>
                    <Text style={styles.listItem}>◦ the terms of the authorization provided through the clearly disclosed submission workflow,</Text>
                    <Text style={styles.listItem}>◦ technical feasibility,</Text>
                    <Text style={styles.listItem}>◦ audit or legal retention requirements,</Text>
                    <Text style={styles.listItem}>◦ program or payout-related conditions.</Text>
                  </View>
                </View>

                <Text style={styles.leadText}>Requests will be reviewed on a case-by-case basis.</Text>

                <Text style={styles.subHeading}>10.10 Incorrect or unauthorized submissions</Text>
                <Text style={styles.leadText}>If we become aware that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• child-related data has been submitted without proper authorization, or</Text>
                  <Text style={styles.listItem}>• content violates applicable rights or policies,</Text>
                </View>
                <Text style={styles.leadText}>we may:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• investigate the matter,</Text>
                  <Text style={styles.listItem}>• restrict access to such data,</Text>
                  <Text style={styles.listItem}>• remove or delete such content where appropriate.</Text>
                </View>

                <Text style={styles.subHeading}>10.11 No direct child interaction</Text>
                <Text style={styles.leadText}>We do not knowingly:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• collect personal data directly from children without parental involvement,</Text>
                  <Text style={styles.listItem}>• allow children to independently submit personal data,</Text>
                  <Text style={styles.listItem}>• allow children to independently participate in transactions, payouts, or contractual activities.</Text>
                </View>

                <Text style={styles.subHeading}>10.12 Approach to child data protection</Text>
                <Text style={styles.leadText}>We aim to apply a high standard of care when handling child-related data, including:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• limiting unnecessary collection,</Text>
                  <Text style={styles.listItem}>• restricting use to defined purposes,</Text>
                  <Text style={styles.listItem}>• avoiding misuse or unauthorized disclosure,</Text>
                  <Text style={styles.listItem}>• handling such data with additional sensitivity due to its nature.</Text>
                </View>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('11')}>
              <Text style={styles.sectionHeader}>11. Updates, Contact, and General Provisions</Text>
            </TouchableOpacity>
            {expandedSections['11'] && (
              <>
                <Text style={styles.subHeading}>11.1 Changes to this Privacy Policy</Text>
                <Text style={styles.leadText}>We may update this Privacy Policy from time to time to reflect:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• changes in our services, features, or business operations,</Text>
                  <Text style={styles.listItem}>• updates to our data processing practices,</Text>
                  <Text style={styles.listItem}>• changes in applicable legal or regulatory requirements,</Text>
                  <Text style={styles.listItem}>• improvements to our security, privacy, or compliance measures.</Text>
                </View>
                <Text style={styles.leadText}>The updated version will be made available on our website and will include a revised "Last Updated" date.</Text>
                <Text style={styles.leadText}>We encourage you to review this Privacy Policy periodically to stay informed about how we handle personal data.</Text>

                <Text style={styles.subHeading}>11.2 Notification of changes</Text>
                <Text style={styles.leadText}>We may, at our discretion, provide additional notice of material changes through:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• website notifications,</Text>
                  <Text style={styles.listItem}>• in-app messages,</Text>
                  <Text style={styles.listItem}>• email or other communication channels.</Text>
                </View>
                <Text style={styles.leadText}>However, unless required by applicable law, we are not obligated to provide individual notice for every update.</Text>

                <Text style={styles.subHeading}>11.3 Grievance Officer / Privacy Contact</Text>
                <Text style={styles.leadText}>In accordance with applicable laws, including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, the Company has designated a Grievance Officer to address privacy-related concerns, complaints, and data protection requests.</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Name:</Text> Shubha Nayak</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Designation:</Text> Director & Grievance Officer</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Email:</Text> support@allrounderbaby.com</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Address:</Text> Flat A 304, Royal City, Potiya Road, Durg, Chhattisgarh – 491001, India</Text>

                <Text style={styles.leadText}>Users may contact the Grievance Officer for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• data access, correction, or deletion requests</Text>
                  <Text style={styles.listItem}>• withdrawal of consent</Text>
                  <Text style={styles.listItem}>• complaints regarding data processing</Text>
                  <Text style={styles.listItem}>• any privacy or security-related concerns</Text>
                </View>

                <Text style={styles.leadText}>The Company aims to acknowledge and resolve grievances within 30 days from the date of receipt, or within such period as required under applicable law.</Text>

                <Text style={styles.subHeading}>11.4 Data Protection Officer (DPO)</Text>
                <Text style={styles.leadText}>The Company has assessed its current operations and does not appoint a formal Data Protection Officer under Article 37 of the GDPR at this stage, as its core activities do not currently involve large-scale systematic monitoring or large-scale processing of special categories of personal data.</Text>
                <Text style={styles.leadText}>The Company will continue to review this position periodically and will appoint a Data Protection Officer where required under applicable law.</Text>
                <Text style={styles.leadText}>For all privacy-related matters, users may contact the Grievance Officer or the Company at: support@allrounderbaby.com.</Text>
                <Text style={styles.subHeading}>11.5 Response to requests</Text>
                <Text style={styles.leadText}>We handle privacy-related queries, requests, and complaints in accordance with our internal processes and applicable law, including applicable verification requirements and response timelines.</Text>

                <Text style={styles.subHeading}>11.6 Governing law and jurisdiction</Text>
                <Text style={styles.leadText}>This Privacy Policy is governed by the laws of India.</Text>
                <Text style={styles.leadText}>This does not limit any mandatory rights or protections available to you under applicable data protection laws in your jurisdiction.</Text>

                <Text style={styles.subHeading}>11.7 Relationship with applicable laws</Text>
                <Text style={styles.leadText}>Where applicable data protection laws grant you specific rights or protections, such rights will apply to the extent required by law.</Text>
                <Text style={styles.leadText}>Nothing in this Privacy Policy is intended to limit or exclude rights that cannot be lawfully restricted.</Text>

                <Text style={styles.subHeading}>11.8 Severability</Text>
                <Text style={styles.leadText}>If any provision of this Privacy Policy is found to be invalid, unlawful, or unenforceable, the remaining provisions will continue to remain in full force and effect.</Text>

                <Text style={styles.subHeading}>11.9 No waiver</Text>
                <Text style={styles.leadText}>Failure by us to enforce any provision of this Privacy Policy shall not constitute a waiver of that provision or any other rights.</Text>

                <Text style={styles.subHeading}>11.10 Interpretation</Text>
                <Text style={styles.leadText}>Headings in this Privacy Policy are for convenience only and do not affect interpretation.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('12')}>
              <Text style={styles.sectionHeader}>12. Additional Disclosures and Clarifications</Text>
            </TouchableOpacity>
            {expandedSections['12'] && (
              <>
                <Text style={styles.subHeading}>12.1 No sale of personal data</Text>
                <Text style={styles.leadText}>We do not sell personal data as a standalone commercial activity involving the exchange of personal data for monetary consideration.</Text>
                <Text style={styles.leadText}>However, we may use analytics, advertising, and tracking technologies as described in this Privacy Policy and our Cookies Policy.</Text>

                <Text style={styles.subHeading}>12.2 No solely automated decision-making with legal effect</Text>
                <Text style={styles.leadText}>We do not use personal data to make solely automated decisions that produce legal effects or similarly significant impacts on individuals without appropriate human involvement where required by applicable law.</Text>
                <Text style={styles.leadText}>Certain automated processes (such as validation checks, fraud detection indicators, or system controls) may be used as part of our operations, but such processes are designed to support decision-making and are not intended to replace appropriate human oversight where required.</Text>

                <Text style={styles.subHeading}>12.3 Data accuracy and user responsibility</Text>
                <Text style={styles.leadText}>You are responsible for ensuring that the personal data you provide is:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• accurate,</Text>
                  <Text style={styles.listItem}>• complete,</Text>
                  <Text style={styles.listItem}>• and up to date.</Text>
                </View>
                <Text style={styles.leadText}>We may rely on the information provided by you for operational, payout, and compliance purposes, and are not responsible for issues arising from incorrect, incomplete, or outdated information submitted by users.</Text>
                <Text style={styles.subHeading}>12.4 Third-party platforms and environments</Text>
                <Text style={styles.leadText}>Our platform may contain links to third-party websites, services, or applications, or may integrate with third-party systems.</Text>
                <Text style={styles.leadText}>Where you interact with such third-party services:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• your data may be processed under their respective policies,</Text>
                  <Text style={styles.listItem}>• we do not control their independent processing practices,</Text>
                  <Text style={styles.listItem}>• we are not responsible for their privacy practices or content.</Text>
                </View>
                <Text style={styles.leadText}>We encourage you to review the privacy policies of such third parties before providing personal data.</Text>

                <Text style={styles.subHeading}>12.5 Platform availability and operational limitations</Text>
                <Text style={styles.leadText}>We aim to provide our services in a reliable and secure manner, subject to technical, operational, and third-party limitations.</Text>
                <Text style={styles.leadText}>While we aim to maintain reliable and secure services, we do not guarantee:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• uninterrupted or continuous availability,</Text>
                  <Text style={styles.listItem}>• error-free operation,</Text>
                  <Text style={styles.listItem}>• compatibility across all devices, environments, or networks.</Text>
                </View>
                <Text style={styles.leadText}>This does not affect our obligations under applicable data protection laws.</Text>

                <Text style={styles.subHeading}>12.6 Scope of this Privacy Policy</Text>
                <Text style={styles.leadText}>This Privacy Policy describes how we handle personal data within the scope of our platform and services.</Text>
                <Text style={styles.leadText}>It does not:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• create contractual obligations beyond what is required under applicable law,</Text>
                  <Text style={styles.listItem}>• override specific contractual terms applicable to particular products, services, or programs, except where required by law.</Text>
                </View>
                <Text style={styles.subHeading}>12.7 Interpretation and structure</Text>
                <Text style={styles.leadText}>Headings in this Privacy Policy are for convenience only and do not affect interpretation.</Text>
                <Text style={styles.leadText}>References to sections are intended to improve readability and do not limit the meaning of the content.</Text>
              </>
            )}
          </View>
        </View>
      </ScreenScroll >
    </View >

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f2',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 0,
    paddingHorizontal: 10,
  },
  information: {
    flex: 1,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#E0F7FA',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
    color: '#1434a4',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1434a4',
    marginTop: -10,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1434a4',
    paddingHorizontal: 5,
  },
  leadText: {
    paddingLeft: 20,
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
    color: '#666',
    paddingHorizontal: 5,
    textAlign: 'justify',
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  marginBottom0: {
    marginBottom: 0,
  },
  highlightBox: {
    backgroundColor: '#e9f7ef',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#28a745',
    marginVertical: 20,
  },
  infoListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  infoListItemContent: {
    marginLeft: -8,
    flex: 1,
  },
  infoListItemContentLandscape: {
    flex: 0,
  },
  section: {
    marginBottom: 20,
  },
  sectionContainer: {
    padding: 0,
    borderRadius: 8,
    margin: 12,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
    color: '#1434a4',
    paddingHorizontal: 10,
    marginBottom: 7,
  },
  list: {
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    marginBottom: 6,
  },
  addressBox: {
    backgroundColor: '#fafafa',
    padding: 10,
    paddingTop: 0,
    borderRadius: 8,
    marginVertical: 8,
  },
  addressText: {
    paddingLeft: 15,
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  imageGallery: {
    marginTop: 12,
    paddingHorizontal: 10,
  },
  imageWrap: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
  galleryImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
  },
});
export default PrivacyPolicy;