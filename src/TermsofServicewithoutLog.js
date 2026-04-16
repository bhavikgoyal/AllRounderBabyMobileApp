import React from 'react';
import { View, Text, StyleSheet, useColorScheme, Linking, BackHandler, StatusBar, Alert, TouchableOpacity } from 'react-native';
import ScreenScroll from './components/ScreenScroll';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const TermsofServicewithoutLog = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        console.log('TermsofServicewithoutLog: hardware back press');
        try {
          if (navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
            navigation.goBack();
          } else if (navigation && typeof navigation.navigate === 'function') {
            navigation.navigate('Login');
          } else {
            Alert.alert('Navigation', 'Unable to navigate back.');
          }
        } catch (e) {
          console.warn('Back action error', e);
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        backHandler.remove();
        StatusBar.setHidden(false);
      };
    }, [navigation])
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#2a3144' : '#fff',
  };

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
  });

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
          ]}>Terms of Service</Text>

          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('1')}>
              <Text style={styles.sectionHeader}>
                1.  Introduction And Acceptance Of Terms
              </Text>
            </TouchableOpacity>
            {expandedSections['1'] && (
              <>
                <Text style={styles.leadText}>
                  Welcome to Allrounder Baby, operated by Sarvashine Allrounder Baby Solutions Private Limited, a company incorporated under the laws of India, having its registered office at Flat A 304, Royal City, Potiya Road, Durg, Chhattisgarh – 491001, India (hereinafter referred to as "Company", "we", "us", or "our").
                </Text>

                <Text style={styles.leadText}>
                  These Terms of Use ("Terms") govern your access to and use of our website, mobile application, content, and services (collectively, the "Platform").
                </Text>

                <Text style={styles.leadText}>
                  By purchasing our program or accessing or using any part of the Platform, you agree to be legally bound by these Terms. If you do not agree with these Terms, you must not access or use the Platform.
                </Text>

                <Text style={styles.subHeading}>1.1 Who Can Use the Platform</Text>
                <Text style={styles.leadText}>
                  The Platform is intended for use by parents, guardians, caregivers, and other responsible adults who are engaging with early childhood development content for children typically aged 0–5 years.
                </Text>

                <Text style={styles.leadText}>By using the Platform, you confirm that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• You are legally capable of entering into a binding agreement under applicable law, and</Text>
                  <Text style={styles.listItem}>• You are using the Platform for yourself and/or for the benefit of your child or a child under your lawful care, supervision, or responsibility.</Text>
                </View>
                <Text style={styles.subHeading}>1.2 Nature of the Program</Text>
                <Text style={styles.leadText}>The Allrounder Baby program is an educational and awareness-based parenting program designed to support thoughtful and informed parenting during early childhood.</Text>

                <Text style={styles.leadText}>The content provided:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Is based on a combination of parenting experience, structured frameworks, and general scientific understanding,</Text>
                  <Text style={styles.listItem}>• Is intended for informational and educational purposes only; and</Text>
                  <Text style={styles.listItem}>• Does not constitute medical, psychological, clinical, or professional advice.</Text>
                </View>

                <Text style={styles.leadText}>You acknowledge that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Outcomes may vary for each child and family,</Text>
                  <Text style={styles.listItem}>• The Company does not guarantee specific developmental results, and</Text>
                  <Text style={styles.listItem}>• You remain solely responsible for decisions relating to your child's care, development, and well-being.</Text>
                  <Text style={styles.listItem}>•Any reliance on the content is at your own discretion and risk.</Text>
                </View>

                <Text style={styles.leadText}>The Platform is not a substitute for professional medical, developmental, psychological, therapeutic, or emergency advice, diagnosis, or treatment, and you should seek qualified professional guidance for child-specific concerns where appropriate.</Text>

                <Text style={styles.leadText}>Our mobile applications are distributed through platforms including the Google Play Store and the Apple App Store. Use of our applications may also be subject to the terms, policies, and privacy frameworks of these platform providers.</Text>

                <Text style={styles.leadText}>On iOS devices, certain data collection, tracking, or attribution activities may be governed by Apple platform requirements, including user permissions and device-level privacy settings. Users may control such permissions through their device settings.</Text>

                <Text style={styles.subHeading}>1.3 Binding Effect of Terms</Text>
                <Text style={styles.leadText}>These Terms become legally binding when you access, browse, interact with, purchase from, register for, log in to, or otherwise use any part of the Platform.</Text>
                <Text style={styles.leadText}>Certain paid features, including account-based access to purchased program content, are available only after successful payment and any required account setup or verification.</Text>
                <Text style={styles.leadText}>If you do not agree to these Terms, you must not access or use the Platform.</Text>
                <Text style={styles.subHeading}>1.4 Acceptance of Related Policies</Text>
                <Text style={styles.leadText}>Your use of the Platform is also subject to our Privacy Policy and other applicable policies, which are incorporated by reference into these Terms.</Text>
                <Text style={styles.leadText}>Acceptance of these Terms is separate from and independent of any consent required under the Privacy Policy.</Text>

                <Text style={styles.subHeading}>1.5 Updates to Terms</Text>
                <Text style={styles.leadText}>We may update or revise these Terms from time to time to reflect changes in our services, legal requirements, operational practices, or risk controls.</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>Unless otherwise stated, updated Terms become effective when posted on the Platform or on the effective date stated in the updated Terms.</Text>
                <Text style={styles.leText} />
                <Text style={styles.leadText}>Where required by law, or where changes are material, we may provide additional notice through the Platform, email, WhatsApp, or other appropriate communication channels.</Text>
                <Text style={styles.leadText}>Continued access to or use of the Platform after the effective date of the updated Terms constitutes your acceptance of the revised Terms.</Text>

                <Text style={styles.subHeading}>1.6 Contact Information</Text>
                <Text style={styles.leadText}>For any questions, concerns, or support requests regarding these Terms, you may contact us at:</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Email:</Text> support@allrounderbaby.com</Text>
                <Text style={styles.leadText}>The Company has designated a Grievance Officer for handling user concerns, complaints, and data-related requests.</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Name:</Text> Shubha Nayak</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Designation:</Text> Director & Grievance Officer</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Email:</Text> support@allrounderbaby.com</Text>
                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Address:</Text> Flat A 304, Royal City, Potiya Road, Durg, Chhattisgarh – 491001, India</Text>

              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('2')}>
              <Text style={styles.sectionHeader}>2. Eligibility, Accounts And Access Control</Text>
            </TouchableOpacity>
            {expandedSections['2'] && (
              <>
                <Text style={styles.leadText}>All discretionary decisions by the Company under these Terms shall be exercised in a reasonable, non-arbitrary, and good-faith manner consistent with the purpose of the relevant provision and applicable law.</Text>

                <Text style={styles.subHeading}>2.1 Account Creation and Eligibility</Text>
                <Text style={styles.leadText}>Access to the Platform is provided only after successful purchase of the program.</Text>
                <Text style={styles.leadText}>Each purchase grants access to a single user account, and multiple accounts for the same purchase are not permitted.</Text>
                <Text style={styles.leadText}>The Platform may be used only by individuals least 18 years of age and legally capable of entering into a binding contract.</Text>
                <Text style={styles.leadText}>The Platform is intended for use by parents, guardians, caregivers, or other responsible adults for the benefit of children aged 0–5 years.</Text>
                <Text style={styles.leadText}>Children are not permitted to independently create accounts or access the Platform.</Text>
                <Text style={styles.leadText}>You agree to provide accurate, complete, and up-to-date information during account creation and while using the Platform.</Text>
                <Text style={styles.leadText}>By accessing or using the Platform, you agree to comply with all technical and usage conditions, including access limitations and content protection mechanisms, as described in these Terms and communicated on the Platform.</Text>

                <Text style={styles.subHeading}>2.2 Account Ownership</Text>
                <Text style={styles.leadText}>The account shall be identified and operated based on the primary login credentials provided, including email address and/or WhatsApp number.</Text>
                <Text style={styles.leadText}>The individual associated with such login credentials shall be treated as the authorized account holder for all purposes, including access, communication, and account-related decisions.</Text>
                <Text style={styles.leadText}>The Company may require reasonable verification before acting on any request relating to account recovery, credential changes, device changes, payout changes, or other sensitive account actions.</Text>
                <Text style={styles.subHeading}>2.3 Login Methods</Text>
                <Text style={styles.leadText}>You may access your account using:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Your registered email address, and/or</Text>
                  <Text style={styles.listItem}>• Your registered WhatsApp number (if provided)</Text>
                </View>

                <Text style={styles.leadText}>Authentication may be completed through:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Password-based login (with reset link sent to registered email), or</Text>
                  <Text style={styles.listItem}>• One-time password (OTP) sent to your registered email and/or WhatsApp number</Text>
                </View>
                <Text style={styles.leadText}>OTP-based login is available only through email and WhatsApp channels. SMS-based authentication is not supported.</Text>

                <Text style={styles.subHeading}>2.4 Account Security</Text>
                <Text style={styles.leadText}>You are solely responsible for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Maintaining the confidentiality of your login credentials,</Text>
                  <Text style={styles.listItem}>• Restricting access to your account,</Text>
                  <Text style={styles.listItem}>• All activities that occur under your account.</Text>
                </View>
                <Text style={styles.leadText}>The Company shall not be liable for any unauthorized access, misuse, or loss arising from failure to safeguard your credentials.</Text>
                <Text style={styles.subHeading}>2.5 Access Restrictions and Device Limits</Text>
                <Text style={styles.leadText}>Access to the Platform is subject to system-based security and usage controls.</Text>
                <Text style={styles.leadText}>For website access, this may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• automatic logout after approximately 30 minutes of inactivity;</Text>
                  <Text style={styles.listItem}>• limits on login attempts within a defined period, including up to 10 login attempts within 24 hours; and</Text>
                  <Text style={styles.listItem}>• automatic logout of prior sessions where multiple simultaneous logins are detected or not permitted.</Text>
                </View>
                <Text style={styles.leadText}>For mobile application access, this may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• restriction of access to a limited number of authorized devices, including a maximum of 2 devices at a time unless otherwise approved by the Company;</Text>
                  <Text style={styles.listItem}>• additional verification, administrative review, or device-reset procedures where a new device is requested beyond the permitted device limit; and</Text>
                  <Text style={styles.listItem}>• limits on login attempts within a defined period, including up to 10 login attempts within 24 hours.</Text>
                </View>
                <Text style={styles.leadText}>The Company may modify reasonable technical controls from time to time for security, anti-abuse, operational, or service-delivery purposes.</Text>
                <Text style={styles.leadText}>Such controls are implemented as reasonable measures to protect content, prevent unauthorized access, and maintain platform integrity.</Text>

                <Text style={styles.subHeading}>2.6 Video Access and Usage Limits</Text>
                <Text style={styles.leadText}>Access to video content is governed by system-based rules, including playback limitations.</Text>
                <Text style={styles.leadText}>Unless otherwise specified within the Platform:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Each video may be subject to system-defined playback limits, which may be based on total viewing duration, number of plays, or other usage parameters determined by the Platform;</Text>
                  <Text style={styles.listItem}>• Playback limits may apply across different language versions of the same content; and</Text>
                  <Text style={styles.listItem}>• Certain introductory or concluding content may be exempt from such limits.</Text>
                </View>
                <Text style={styles.leadText}>All usage is monitored through system controls, and the Company may rely on system-generated usage data, logs, and technical records as evidence of access, playback, and compliance, except in the case of manifest error or verified technical malfunction.</Text>

                <Text style={styles.subHeading}>2.7 Program Progression and Access Structure</Text>
                <Text style={styles.leadText}>The program may include time-based progression, staged access, and validity windows for specific content or modules.</Text>
                <Text style={styles.leadText}>Access to certain content may:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Be unlocked after defined time intervals;</Text>
                  <Text style={styles.listItem}>• Remain available for a limited duration; or</Text>
                  <Text style={styles.listItem}>• Require completion or interaction with prior steps.</Text>
                </View>
                <Text style={styles.leadText}>Such rules are governed by the Platform's internal logic and may vary across different sections of the program.</Text>
                <Text style={styles.leadText}>Such rules will be applied in a reasonable, non-arbitrary manner consistent with the nature of the program and user access expectations.</Text>
                <Text style={styles.subHeading}>2.8 Duration of Access</Text>
                <Text style={styles.leadText}>Access to the program may be subject to defined duration, validity periods, or continued availability of the Platform, as communicated at the time of purchase or within the Platform.</Text>
                <Text style={styles.leadText}>Unless explicitly stated otherwise at the time of purchase, access to content is not guaranteed to be lifetime and may be subject to reasonable service lifecycle changes, platform updates, retirement of features, or discontinuation.</Text>

                <Text style={styles.subHeading}>2.9 Prohibited Use</Text>
                <Text style={styles.leadText}>You agree not to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Share, transfer, resell, sublicense, or provide access to your account credentials or purchased access to any third party, including friends, relatives, family members outside the intended authorized user, resellers, or group users;</Text>
                  <Text style={styles.listItem}>• Record, copy, download, distribute, or reproduce any content from the Platform;</Text>
                  <Text style={styles.listItem}>• Use the Platform for any commercial, unauthorized, or unlawful purpose; or</Text>
                  <Text style={styles.listItem}>• Attempt to bypass, manipulate, or interfere with any technical restrictions or security features.</Text>
                </View>

                <Text style={styles.subHeading}>2.10 Suspension and Termination</Text>
                <Text style={styles.leadText}>The Company reserves the right to suspend, restrict, or, where appropriate, terminate your access to the Platform, with or without prior notice where reasonably necessary, and without refund in the case of justified termination except where required by applicable law, if:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• you violate these Terms or any applicable policy;</Text>
                  <Text style={styles.listItem}>• unauthorized use, sharing, fraud, or misuse is detected or reasonably suspected;</Text>
                  <Text style={styles.listItem}>• your actions may harm the Platform, other users, service providers, or the Company; or</Text>
                  <Text style={styles.listItem}>• verification, security, compliance, or legal concerns require such action.</Text>
                </View>
                <Text style={styles.leadText}>In serious cases, the Company reserves the right to initiate legal action.</Text>
                <Text style={styles.leadText}>Where reasonably practicable, the Company may provide prior notice and an opportunity to cure, except in cases involving fraud, abuse, security risk, or legal necessity.</Text>
                <Text style={styles.leadText}>Where "legitimate interests" are referenced, such processing shall be interpreted in accordance with applicable local laws and shall not override consent requirements where consent is required under such laws.</Text>

                <Text style={styles.subHeading}>2.11 Account Recovery</Text>
                <Text style={styles.leadText}>If you lose access to your registered email address and WhatsApp number, account recovery shall be subject to Company verification procedures, which may include validation of payment records or other supporting information.</Text>
                <Text style={styles.leadText}>The Company reserves the right to approve, delay, condition, or deny recovery requests where it is unable to reasonably verify account ownership, payment history, access credentials, security details, or other supporting information.</Text>
                <Text style={styles.subHeading}>2.12 Access Conditions Summary</Text>
                <Text style={styles.leadText}>The Platform is subject to technical, security, and operational controls designed to ensure fair usage, content protection, and system integrity.</Text>
                <Text style={styles.leadText}>These may include device limits, login attempt restrictions, session controls, playback limitations, staged content access, and validity periods, as described in Sections 2.5 to 2.8 and as communicated within the Platform.</Text>
                <Text style={styles.leadText}>The Company may update or modify such controls from time to time in a reasonable and non-arbitrary manner for security, operational, or service-delivery purposes.</Text>

              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('3')}>
              <Text style={styles.sectionHeader}>3. Payments, Pricing And Refund</Text>
            </TouchableOpacity>
            {expandedSections['3'] && (
              <>
                <Text style={styles.subHeading}>3.1 Paid Access Only</Text>
                <Text style={styles.leadText}>Access to the Platform is available only upon successful payment of the applicable program fee.</Text>
                <Text style={styles.leadText}>The Company does not provide free access to the program unless explicitly stated.</Text>

                <Text style={styles.subHeading}>3.2 Pricing and Currency</Text>
                <Text style={styles.leadText}>Program pricing may be displayed in Indian Rupees (INR) or other currencies depending on your location, platform, or payment method.</Text>
                <Text style={styles.leadText}>You acknowledge that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• The final amount charged may vary due to currency conversion rates, payment provider policies, or international transaction charges;</Text>
                  <Text style={styles.listItem}>• Any additional fees charged by your bank, card issuer, or payment provider are your responsibility.</Text>
                </View>

                <Text style={styles.subHeading}>3.3 Payment Processing</Text>
                <Text style={styles.leadText}>Payments are processed through third-party payment gateways or service providers.</Text>
                <Text style={styles.leadText}>The Company does not control third-party payment systems and is not responsible for errors, delays, reversals, settlement failures, foreign exchange issues, bank-side failures, or gateway outages caused by payment gateways, banks, card networks, or other third-party processors.</Text>
                <Text style={styles.leadText}>However, where successful payment is reflected in the Company's records or is otherwise reasonably verified, the Company remains responsible for granting the corresponding program access in accordance with these Terms, subject to any required account setup, fraud checks, or verification procedures.</Text>

                <Text style={styles.subHeading}>3.4 Taxes and Invoices</Text>
                <Text style={styles.leadText}>Applicable taxes, including Goods and Services Tax (GST) where relevant, shall be charged as per applicable laws.</Text>
                <Text style={styles.leadText}>For users in India, a valid tax invoice may be issued based on the details provided at the time of purchase.</Text>

                <Text style={styles.subHeading}>3.5 No Refund Policy</Text>
                <Text style={styles.leadText}>Except as required by applicable law or expressly approved by the Company in relation to a verified duplicate charge, payment processing anomaly, or comparable exceptional billing error, all purchases are final and non-refundable.</Text>
                <Text style={styles.leadText}>Once payment is successfully completed:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• no refunds, cancellations, or reversals shall be provided for change of mind, non-use, partial use, dissatisfaction, or failure to complete the program; and</Text>
                  <Text style={styles.listItem}>• access already granted or made available shall not create any right to refund.</Text>
                </View>

                <Text style={styles.leadText}>For users located in jurisdictions where a statutory right of withdrawal applies (such as the European Union), you expressly:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>1. request and consent to immediate access to the digital content upon purchase; and</Text>
                  <Text style={styles.listItem}>2. acknowledge and agree that, once access begins, you lose any applicable statutory right of withdrawal or cancellation to the extent permitted under applicable law.</Text>
                </View>

                <Text style={styles.leadText}>This acknowledgment forms an essential condition of purchase and applies regardless of the extent of content accessed.</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>For clarity, the digital content provided through the Platform is considered to be supplied on a continuous and on-demand basis, and access to such content constitutes commencement of performance of the service.</Text>
                <Text style={styles.leadText}>This clause is subject to Section 3.5A below.</Text>

                <Text style={styles.subHeading}>3.5A Service Delivery and Access Issues</Text>
                <Text style={styles.leadText}>If payment has been successfully received by the Company but access to the program is not provided due to a verified Company-side technical or account-related issue, the Company will make reasonable efforts to resolve the issue within a reasonable time after being notified by the user.</Text>

                <Text style={styles.leadText}>Where such issue is not resolved within a reasonable period, the Company may, at its discretion or where required under applicable law:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• restore or provide access to the program;</Text>
                  <Text style={styles.listItem}>• extend the access validity period;</Text>
                  <Text style={styles.listItem}>• re-perform the service; or</Text>
                  <Text style={styles.listItem}>• issue an appropriate refund or reversal as a last resort.</Text>
                </View>

                <Text style={styles.subHeading}>3.6 Exceptions for Legal Compliance</Text>
                <Text style={styles.leadText}>Nothing in these Terms shall limit or exclude any rights that you may have under applicable consumer protection laws, including mandatory rights in your jurisdiction that cannot be waived.</Text>
                <Text style={styles.leadText}>Where such rights apply, they shall prevail over this clause.</Text>

                <Text style={styles.subHeading}>3.7 Price Changes</Text>
                <Text style={styles.leadText}>The Company reserves the right to modify pricing at any time.</Text>
                <Text style={styles.leadText}>Any such changes shall not affect purchases already completed prior to the revised pricing.</Text>

                <Text style={styles.subHeading}>3.8 International Transactions</Text>
                <Text style={styles.leadText}>For users making payments from outside India:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Additional charges such as foreign exchange fees, international transaction fees, or bank charges may apply;</Text>
                  <Text style={styles.listItem}>• Such charges are determined by your financial institution or payment provider and are not controlled by the Company;</Text>
                  <Text style={styles.listItem}>• The Company is not responsible for exchange-rate fluctuations, intermediary bank deductions, card-network fees, foreign transaction fees, or country-specific payment restrictions imposed by third parties.</Text>
                </View>

              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('4')}>
              <Text style={styles.sectionHeader}>4. Rewards, Reffrral And Feedback Program</Text>
            </TouchableOpacity>
            {expandedSections['4'] && (
              <>
                <Text style={styles.subHeading}>4.1 Nature of the Program</Text>
                <Text style={styles.leadText}>
                  The Company may, at its sole discretion, offer users the opportunity to participate in referral, feedback, or reward-based programs (collectively, the "Program").
                </Text>

                <Text style={styles.leadText}>
                  The promotional and incentive-based initiative intended to encourage user engagement and sharing of the Platform.
                </Text>

                <Text style={styles.leadText}>Participation in the Program:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• does not create any employment, agency, partnership, or joint venture relationship between the user and the Company;</Text>
                  <Text style={styles.listItem}>• does not guarantee any fixed, recurring, or assured income;</Text>
                  <Text style={styles.listItem}>• is voluntary and subject to these Terms and applicable policies.</Text>
                </View>

                <Text style={styles.leadText}>
                  Any rewards or payouts may be described operationally as referral benefits or commissions; however, such terminology shall not alter the legal nature of the Program as an independent incentive-based arrangement.
                </Text>

                <Text style={styles.subHeading}>4.2 Eligibility and Participation</Text>
                <Text style={styles.leadText}>Participation in the Program is limited to users who:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• are eligible users as determined by the Company, which may include successful purchase of the program where required for the relevant reward, referral, feedback, or payout feature; and</Text>
                  <Text style={styles.listItem}>• comply with all applicable Terms, policies, and platform requirements.</Text>
                </View>

                <Text style={styles.leadText}>The Company reserves the right to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• determine eligibility criteria;</Text>
                  <Text style={styles.listItem}>• approve or reject participation;</Text>
                  <Text style={styles.listItem}>• modify, restrict, or suspend access to the Program at any time.</Text>
                </View>

                <Text style={styles.leadText}>
                  Any such decisions shall be made in a reasonable, non-arbitrary manner consistent with the purpose of the relevant program and applicable law.
                </Text>
                <Text style={styles.subHeading}>4.3 Referral Qualification Criteria</Text>
                <Text style={styles.leadText}>A referral shall be considered valid and eligible for reward only when:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• the referred individual uses a valid referral mechanism or identifier, where applicable;</Text>
                  <Text style={styles.listItem}>• the referred individual completes a successful purchase of the program; and</Text>
                  <Text style={styles.listItem}>• the transaction passes the Company's internal validation and verification checks.</Text>
                </View>

                <Text style={styles.leadText}>No rewards shall be generated for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• incomplete registrations;</Text>
                  <Text style={styles.listItem}>• unpaid or failed transactions;</Text>
                  <Text style={styles.listItem}>• cancelled or reversed transactions;</Text>
                  <Text style={styles.listItem}>• self-referrals, duplicate accounts, or artificial transactions.</Text>
                </View>

                <Text style={[styles.leadText, { marginBottom: 0 }]}>The Company's records, tracking systems, and internal verification processes shall be final and binding in determining referral eligibility.</Text>

                <Text style={styles.subHeading}>4.4 Reward Structure</Text>
                <Text style={[styles.leadText, { marginBottom: 8 }]}>Eligible users may receive rewards in the form of:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• monetary payouts;</Text>
                  <Text style={styles.listItem}>• incentives; or</Text>
                  <Text style={styles.listItem}>• other benefits as determined by the Company.</Text>
                </View>

                <Text style={styles.leadText}>Rewards may be provided:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• in Indian Rupees (INR) for users located in India; and</Text>
                  <Text style={styles.listItem}>• in United States Dollars (USD) for users located outside India.</Text>
                </View>

                <Text style={styles.leadText}>The structure, amount, timing, and conditions of rewards may be modified at any time.</Text>

                <Text style={styles.leadText}>No user shall have a vested or guaranteed right to receive any reward unless all eligibility conditions are satisfied and verified.</Text>

                <Text style={styles.leadText}>Reward descriptions, examples, payout illustrations, timelines, or promotional statements are informational only and do not create a contractual guarantee, fixed earning expectation, or vested right.</Text>

                <Text style={styles.subHeading}>4.5 Mandatory Information and Verification</Text>
                <Text style={styles.leadText}>To receive any reward or payout, users must:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• provide complete, accurate, and up-to-date payout details;</Text>
                  <Text style={styles.listItem}>• submit required identification or verification information, including tax-related details where applicable;</Text>
                  <Text style={styles.listItem}>• maintain an active and valid profile on the Platform.</Text>
                </View>

                <Text style={styles.leadText}>Failure to comply may result in:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• delay, withholding, rejection, or forfeiture of rewards;</Text>
                  <Text style={styles.listItem}>• inability to process payouts.</Text>
                </View>

                <Text style={styles.leadText}>Where payout details are updated, the latest submitted details shall be used for processing.</Text>

                <Text style={styles.leadText}>The Company may also require re-verification, additional declarations, tax-related details, identity checks, or confirmation of payout ownership before processing or re-processing any reward.</Text>

                <Text style={styles.subHeading}>4.6 Reward Disbursement Mechanism</Text>
                <Text style={styles.leadText}>Rewards are disbursed through authorized third-party payout service providers.</Text>

                <Text style={styles.leadText}><Text style={{ fontWeight: 'bold' }}>(a) International Users</Text></Text>
                <Text style={styles.leadText}>For users outside India:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• rewards may be issued via payout platforms such as Tremendous, or similar providers;</Text>
                  <Text style={styles.listItem}>• users may receive a redemption link and select from available withdrawal or redemption options (such as bank transfer, prepaid cards, or digital wallets), depending on availability in their country;</Text>
                  <Text style={styles.listItem}>• the selection and use of any available redemption or withdrawal option is the user's responsibility and remains subject to the payout provider's availability, local laws, financial-system rules, eligibility requirements, and country-specific restrictions.</Text>
                </View>

                <Text style={styles.leadText}>The Company shall not be responsible for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• any fees, deductions, or charges applied by payout providers, banks, or intermediaries;</Text>
                  <Text style={styles.listItem}>• limitations imposed by local laws or financial systems;</Text>
                  <Text style={styles.listItem}>• any issues arising after payout initiation.</Text>
                </View>

                <Text style={styles.leadText}><Text style={{ fontWeight: 'bold' }}>(b) Domestic Users (India)</Text></Text>
                <Text style={styles.leadText}>For users receiving payouts within India:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• rewards may be processed through bank transfer, UPI, or other authorized methods based on user-provided details.</Text>
                </View>

                <Text style={styles.leadText}>The Company shall not be responsible for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• any charges or deductions applied by banks or payment systems;</Text>
                  <Text style={styles.listItem}>• delays or failures resulting from incorrect or incomplete information.</Text>
                </View>

                <Text style={styles.leadText}>All payouts are subject to applicable laws.</Text>

                <Text style={styles.leadText}>Where required:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• Tax Deducted at Source (TDS) or other statutory deductions may be applied;</Text>
                  <Text style={styles.listItem}>• applicable rates may vary based on PAN availability, validity, or regulatory requirements.</Text>
                </View>

                <Text style={styles.leadText}>The Company remains responsible for initiating payout processing in accordance with these Terms once eligibility is verified and approved.</Text>

                <Text style={styles.subHeading}>4.7 Payout Timeline</Text>
                <Text style={styles.leadText}>Approved rewards are generally intended to be processed within up to 60 days after all required information has been submitted, verification has been successfully completed, and internal approval has been recorded. Actual crediting, redemption, or receipt may take longer due to payout-provider, banking, compliance, technical, holiday, or jurisdiction-specific constraints.</Text>

                <Text style={styles.subHeading}>4.8 Third-Party Processing Disclaimer</Text>
                <Text style={styles.leadText}>The Company's responsibility is limited to initiating or arranging payout processing after successful verification and internal approval, where applicable.</Text>
                <Text style={styles.leadText}>The Company shall not be responsible for delays, failures, rejections, fees, deductions, redemption issues, banking issues, withdrawal issues, or other errors caused by payout providers, banks, payment systems, intermediaries, or user-selected redemption methods, except to the extent directly attributable to the Company's own verified error, as determined based on reasonable evidence.</Text>

                <Text style={styles.subHeading}>4.9 Feedback Incentives</Text>
                <Text style={styles.leadText}>The Company may offer voluntary incentives for submission of feedback, testimonials, or reviews.</Text>
                <Text style={styles.leadText}>Such incentives:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• are discretionary in nature;</Text>
                  <Text style={styles.listItem}>• do not constitute payment for services;</Text>
                  <Text style={styles.listItem}>• are subject to internal review based on authenticity, eligibility, completeness, quality, usability, policy compliance, and any other criteria reasonably applied by the Company.</Text>
                </View>

                <Text style={styles.leadText}><Text style={{ fontWeight: '700' }}>Submission of feedback does not guarantee approval or payout.</Text></Text>

                <Text style={styles.leadText}>Where feedback or testimonial submissions are made as part of reward or incentive programs, users may be informed that such content may be used for marketing or promotional purposes. Any such use shall be based on clear disclosure at the time of submission and the user's acceptance of applicable policies during submission together with submission of the content, as required or permitted under applicable law.</Text>

                <Text style={styles.subHeading}>4.10 Right to Withhold, Reject, or Reverse Rewards</Text>
                <Text style={styles.leadText}>The Company reserves the right to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• review all Program activity;</Text>
                  <Text style={styles.listItem}>• verify authenticity and compliance;</Text>
                  <Text style={styles.listItem}>• withhold, suspend, cancel, or reverse rewards.</Text>
                </View>

                <Text style={styles.leadText}>This may occur in cases including:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• fraudulent or suspicious activity;</Text>
                  <Text style={styles.listItem}>• misuse of referral mechanisms;</Text>
                  <Text style={styles.listItem}>• violation of these Terms or policies;</Text>
                  <Text style={styles.listItem}>• incomplete or incorrect user information;</Text>
                  <Text style={styles.listItem}>• abuse of promotional structures.</Text>
                </View>

                <Text style={[styles.leadText, { marginBottom: 0 }]}>The Company's decision shall be made on the basis of its records, verification processes, anti-fraud controls, and reasonable internal assessment, subject always to applicable law and correction of manifest error.</Text>

                <Text style={styles.leadText}>The Company may also:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• disqualify structured, bulk, or artificially generated referrals;</Text>
                  <Text style={styles.listItem}>• recover amounts already paid; and/or</Text>
                  <Text style={styles.listItem}>• initiate legal action, where necessary.</Text>
                </View>

                <Text style={styles.leadText}>Where amounts have already been paid and are later found to have been issued due to fraud, self-referral, duplicate qualification, policy breach, chargeback, refund, reversal, inaccurate payout data, or other disqualifying circumstances, the Company may recover, offset, withhold, or require repayment of such amounts to the extent permitted by applicable law.</Text>

                <Text style={styles.leadText}>Any such action shall be proportionate, reasonably justified, and based on verifiable evidence, subject to correction of manifest error and applicable law.</Text>

                <Text style={styles.subHeading}>4.11 Taxes and Regulatory Compliance</Text>
                <Text style={styles.leadText}>Users are responsible for their own tax, duty, disclosure, reporting, and compliance obligations arising from rewards received, except to the extent the Company is required by applicable law to deduct, withhold, report, validate, or collect information in relation to such payouts.</Text>

                <Text style={styles.leadText}>The Company may:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• request additional information for compliance purposes;</Text>
                  <Text style={styles.listItem}>• apply deductions or reporting as required under applicable laws.</Text>
                </View>

                <Text style={styles.leadText}>For international payouts:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• transactions shall be processed through authorized channels in compliance with applicable foreign exchange regulations.</Text>
                </View>

                <Text style={styles.subHeading}>4.12 Modification or Discontinuation</Text>
                <Text style={styles.leadText}>The Company reserves the right to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• modify, suspend, or discontinue the Program at any time;</Text>
                  <Text style={styles.listItem}>• change reward structures, eligibility criteria, payout mechanisms, verification requirements, or program conditions at any time, with or without prior notice unless notice is required by applicable law.</Text>
                </View>

                <Text style={styles.leadText}>Any such modification or discontinuation shall not affect rewards already finally approved, except where reversal, withholding, or recovery is permitted under these Terms and applicable law.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('5')}>
              <Text style={styles.sectionHeader}>5. Content, Intellectual Property And Usage Restrictions</Text>
            </TouchableOpacity>
            {expandedSections['5'] && (
              <>
                <Text style={styles.subHeading}>5.1 Ownership of Content</Text>
                <Text style={styles.leadText}>All content available on the Platform, including but not limited to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• videos, audio, text, graphics, visuals, and materials;</Text>
                  <Text style={styles.listItem}>• program structure, sequence, frameworks, and methodologies;</Text>
                  <Text style={styles.listItem}>• design, layout, and presentation of the program;</Text>
                </View>

                <Text style={styles.leadText}>are the exclusive property of the Company or its licensors and are protected under applicable intellectual property laws.</Text>

                <Text style={styles.leadText}>No rights, title, or ownership in any content are transferred to you.</Text>

                <Text style={styles.subHeading}>5.2 Limited License to Users</Text>
                <Text style={styles.leadText}>Upon successful purchase, the Company grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the content strictly for personal use in accordance with these Terms.</Text>

                <Text style={styles.leadText}>This license:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• does not permit commercial use;</Text>
                  <Text style={styles.listItem}>• does not allow sharing, distribution, or public display;</Text>
                  <Text style={styles.listItem}>• is subject to all technical and access restrictions imposed by the Platform.</Text>
                </View>

                <Text style={styles.subHeading}>5.3 Prohibited Activities</Text>
                <Text style={styles.leadText}>You shall not, directly or indirectly:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• record, copy, download, reproduce, or distribute any content from the Platform;</Text>
                  <Text style={styles.listItem}>• share login credentials or provide access to any third party;</Text>
                  <Text style={styles.listItem}>• create derivative works based on the content;</Text>
                  <Text style={styles.listItem}>• use the content for training, teaching, commercial exploitation, or competing services;</Text>
                  <Text style={styles.listItem}>• attempt to bypass, disable, or interfere with any technical protections or security measures.</Text>
                </View>
                <Text style={styles.subHeading}>5.4 Digital Rights Management and Content Protection</Text>
                <Text style={styles.leadText}>The Platform uses advanced Digital Rights Management (DRM) and content protection technologies, including services provided by VdoCipher.</Text>

                <Text style={styles.leadText}>Content may include:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• playback restrictions;</Text>
                  <Text style={styles.listItem}>• encryption;</Text>
                  <Text style={styles.listItem}>• session controls; and</Text>
                  <Text style={styles.listItem}>• forensic watermarking, usage tracing, or similar content protection mechanisms.</Text>
                  <Text style={styles.listItem}>• Any attempt to circumvent or tamper with such protections shall be treated as a serious violation of these Terms.</Text>
                </View>

                <Text style={styles.subHeading}>5.5 Monitoring and Enforcement</Text>
                <Text style={styles.leadText}>The Company reserves the right to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• monitor usage patterns and access behavior;</Text>
                  <Text style={styles.listItem}>• detect unauthorized usage, sharing, or abuse; and</Text>
                  <Text style={styles.listItem}>• rely on system-generated data as evidence of usage.</Text>
                </View>

                <Text style={styles.leadText}>Such system records, access logs, playback data, device records, and related technical evidence may be used by the Company in determining compliance, except in the case of manifest error or verified technical malfunction.</Text>

                <Text style={styles.subHeading}>5.6 Consequences of Violation</Text>
                <Text style={styles.leadText}>In case of any breach of this section, the Company may:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• suspend or terminate access immediately, without refund;</Text>
                  <Text style={styles.listItem}>• restrict future access to the Platform;</Text>
                  <Text style={styles.listItem}>• take appropriate legal action, including claims for damages, losses, or injunctive relief.</Text>
                </View>
                <Text style={styles.subHeading}>5.7 Internal Use of Feedback</Text>
                <Text style={styles.leadText}>The Company may use feedback, suggestions, or inputs provided by users for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• internal analysis;</Text>
                  <Text style={styles.listItem}>• product improvement;</Text>
                  <Text style={styles.listItem}>• research and development;</Text>
                </View>

                <Text style={styles.leadText}>without any obligation of compensation.</Text>

                <Text style={styles.leadText}>Such internal use does not include public use, which remains subject to the authorization framework described in the Privacy Policy, including where such public use has been clearly disclosed at the time of submission and acknowledged through acceptance of applicable policies during submission together with submission of the content.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('6')}>
              <Text style={styles.sectionHeader}>6. Disclaimers And Limmitation Of Liability</Text>
            </TouchableOpacity>
            {expandedSections['6'] && (
              <>
                <Text style={styles.subHeading}>6.1 Educational Nature of the Platform</Text>
                <Text style={styles.leadText}>The Platform provides an educational and awareness-based parenting program intended to support informed decision-making during early childhood.</Text>
                <Text style={styles.leadText}>All content:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• is provided for informational and educational purposes only;</Text>
                  <Text style={styles.listItem}>• is based on general frameworks, experiences, and research insights;</Text>
                  <Text style={styles.listItem}>• does not constitute medical, psychological, clinical, or professional advice.</Text>
                </View>
                <Text style={styles.leadText}>You are solely responsible for any decisions relating to your child's care, development, and well-being.</Text>

                <Text style={styles.subHeading}>6.2 No Guarantee of Results</Text>
                <Text style={styles.leadText}>The Company does not guarantee any specific outcomes from use of the Platform.</Text>
                <Text style={styles.leadText}>You acknowledge that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• each child is unique;</Text>
                  <Text style={styles.listItem}>• developmental outcomes vary;</Text>
                  <Text style={styles.listItem}>• results depend on multiple external factors beyond the Company's control.</Text>
                </View>

                <Text style={styles.subHeading}>6.3 Platform Availability</Text>
                <Text style={styles.leadText}>The Company does not guarantee that the Platform will be:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• uninterrupted;</Text>
                  <Text style={styles.listItem}>• error-free; or</Text>
                  <Text style={styles.listItem}>• continuously available.</Text>
                </View>
                <Text style={styles.leadText}>Access may be affected by:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• maintenance;</Text>
                  <Text style={styles.listItem}>• technical issues;</Text>
                  <Text style={styles.listItem}>• third-party service disruptions; or</Text>
                  <Text style={styles.listItem}>• factors beyond the Company's control.</Text>
                </View>
                <Text style={styles.subHeading}>6.4 Third-Party Services</Text>
                <Text style={styles.leadText}>The Platform may rely on third-party services, including but not limited to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• payment gateways;</Text>
                  <Text style={styles.listItem}>• hosting and infrastructure providers;</Text>
                  <Text style={styles.listItem}>• content delivery systems such as VdoCipher;</Text>
                  <Text style={styles.listItem}>• telecommunications and internet service providers.</Text>
                </View>

                <Text style={styles.leadText}>The Company shall not be responsible for failures, delays, interruptions, unavailability, policy changes, or actions caused by such third parties, or for resulting loss or damage, except to the extent directly caused by the Company's own breach of these Terms or applicable law.</Text>

                <Text style={styles.subHeading}>6.5 Data and Technical Risks</Text>
                <Text style={styles.leadText}>The Company shall not be liable for:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• loss of data;</Text>
                  <Text style={styles.listItem}>• interruption of access;</Text>
                  <Text style={styles.listItem}>• system errors or technical malfunctions;</Text>
                  <Text style={styles.listItem}>• unauthorized access, compromise, or misuse resulting from user-side vulnerabilities, insecure devices or networks, credential-sharing, or other circumstances outside the Company's reasonable control.</Text>
                </View>

                <Text style={styles.leadText}>Users are responsible for maintaining secure devices and internet connections.</Text>

                <Text style={styles.subHeading}>6.6 Limitation of Liability</Text>
                <Text style={styles.leadText}>To the maximum extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, including loss of profits, revenue, data, goodwill, business opportunity, or anticipated savings, arising out of or relating to the Platform, the Program, third-party services, or these Terms.</Text>

                <Text style={styles.leadText}>To the maximum extent permitted by applicable law, the Company's total aggregate liability arising out of or relating to the Platform, the Program, or these Terms, whether in contract, tort (including negligence), statute, or otherwise, shall not exceed the total amount actually paid by you to the Company for the specific program giving rise to the claim.</Text>

                <Text style={styles.leadText}>Nothing in this Section limits or excludes liability for fraud, fraudulent misrepresentation, willful misconduct, gross negligence where such liability cannot be limited under applicable law, or any other liability that cannot lawfully be excluded or limited.</Text>

                <Text style={styles.leadText}>This limitation applies to all claims arising out of or relating to the Platform, the Program, or these Terms, whether arising in contract, tort (including negligence), statute, or otherwise, and regardless of the form of action. The limitation applies only to the extent permitted by applicable law and does not affect any mandatory consumer rights or protections that cannot be excluded or limited.</Text>
                <Text style={styles.subHeading}>6.7 Jurisdictional Limitations</Text>
                <Text style={styles.leadText}>Nothing in these Terms shall exclude or limit any liability that cannot be excluded under applicable law. Where local laws provide mandatory consumer rights, such rights shall prevail.</Text>

                <Text style={styles.subHeading}>6.8 User Responsibility</Text>
                <Text style={styles.leadText}>You agree that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• use of the Platform is at your own discretion and risk;</Text>
                  <Text style={styles.listItem}>• you are responsible for evaluating the suitability of the content;</Text>
                  <Text style={styles.listItem}>• you will seek professional advice where necessary.</Text>
                </View>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('7')}>
              <Text style={styles.sectionHeader}>7. Privacy, Data And User Information</Text>
            </TouchableOpacity>
            {expandedSections['7'] && (
              <>
                <Text style={styles.subHeading}>7.1 Relationship with Privacy Policy</Text>
                <Text style={styles.leadText}>Your use of the Platform is subject to our Privacy Policy, which governs the collection, use, storage, and processing of personal data.</Text>

                <Text style={styles.leadText}>In case of any conflict between these Terms and the Privacy Policy with respect to data protection matters, the Privacy Policy shall prevail.</Text>

                <Text style={styles.subHeading}>7.2 Collection and Use of Data</Text>
                <Text style={styles.leadText}>By using the Platform, you acknowledge that the Company may collect and process personal information, including:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• account and contact details;</Text>
                  <Text style={styles.listItem}>• child-related information provided by you;</Text>
                  <Text style={styles.listItem}>• usage data and interaction patterns;</Text>
                  <Text style={styles.listItem}>• payment and transaction-related data.</Text>
                </View>

                <Text style={styles.leadText}>Such data is used for purposes including:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• providing and improving the Platform;</Text>
                  <Text style={styles.listItem}>• user authentication and access management;</Text>
                  <Text style={styles.listItem}>• analytics, performance monitoring, and service optimization;</Text>
                  <Text style={styles.listItem}>• compliance with legal and regulatory obligations.</Text>
                </View>

                <Text style={styles.leadText}>Further details regarding categories of personal data, legal bases, retention periods, sharing, tracking technologies, consent mechanisms, and user rights are set out in the Privacy Policy.</Text>

                <Text style={styles.subHeading}>7.3 User Rights and Control</Text>
                <Text style={styles.leadText}>You may have the ability to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• access your profile information;</Text>
                  <Text style={styles.listItem}>• update or correct your details;</Text>
                  <Text style={styles.listItem}>• erase, modify, or request deletion of certain information stored within your account, subject to legal, technical, operational, contractual, fraud-prevention, tax, audit, and record-retention requirements.</Text>
                </View>

                <Text style={styles.leadText}>Certain features may allow direct control through the Platform, while others may require contacting the Company.</Text>
                <Text style={styles.subHeading}>7.4 Data Deletion and Retention</Text>
                <Text style={styles.leadText}>You may request deletion or removal of your account data.</Text>
                <Text style={styles.leadText}>However, you acknowledge that:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• deletion of your account may result in loss of access to the Platform; and</Text>
                  <Text style={styles.listItem}>• the Company may retain certain information where required for:</Text>
                </View>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• legal or regulatory compliance;</Text>
                  <Text style={styles.listItem}>• tax, accounting, or audit purposes;</Text>
                  <Text style={styles.listItem}>• fraud prevention, security, and record-keeping obligations.</Text>
                </View>

                <Text style={styles.leadText}>Such retained data shall be handled in accordance with applicable laws. Deletion of profile-facing data does not necessarily require deletion of records that the Company is required or permitted to retain for compliance, tax, accounting, audit, security, dispute-resolution, payout, anti-fraud, or evidentiary purposes.</Text>

                <Text style={styles.subHeading}>7.5 Child-Related Data</Text>
                <Text style={styles.leadText}>Where you provide information relating to a child:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• you confirm that you are authorized to provide such information;</Text>
                  <Text style={styles.listItem}>• you acknowledge that such data may be treated with additional sensitivity and safeguards.</Text>
                </View>

                <Text style={styles.leadText}>The Company does not knowingly collect data directly from children without appropriate parental or guardian involvement.</Text>

                <Text style={styles.subHeading}>7.6 Marketing and Public Use of Content</Text>
                <Text style={styles.leadText}>Submission of feedback, testimonials, or media content may include use for marketing, promotional activities, or public display, where such use has been clearly disclosed at the time of submission.</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>By submitting such content after accepting applicable policies within the submission process, you acknowledge and agree that the Company may use such content for marketing, promotional, or public-facing purposes.</Text>

                <Text style={styles.leadText}>Such authorization forms part of your participation in feedback, testimonial, or reward-based workflows and does not require a separate standalone consent mechanism unless required by applicable law.</Text>

                <Text style={styles.leadText}>Where no such disclosure is provided at the time of submission, the Company will not use such content for public marketing purposes without further authorization.</Text>

                <Text style={styles.leadText}>For clarity, where required under applicable law, this authorization shall be treated as informed consent, provided that the intended use has been clearly disclosed at the time of submission. Users may request restriction or withdrawal of such authorization in accordance with the Privacy Policy, subject to technical feasibility, prior use, and applicable legal or contractual limitations.</Text>

                <Text style={styles.subHeading}>7.7 Analytics and Tracking</Text>
                <Text style={styles.leadText}>The Platform may use analytics, tracking technologies, and performance measurement tools to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• understand user behavior;</Text>
                  <Text style={styles.listItem}>• improve service delivery;</Text>
                  <Text style={styles.listItem}>• measure effectiveness of features and content.</Text>
                </View>

                <Text style={styles.leadText}>Further details are provided in the Privacy Policy.</Text>

                <Text style={styles.subHeading}>7.8 Cross-Border Data Processing</Text>
                <Text style={styles.leadText}>Your information may be processed, stored, or transferred across different jurisdictions, including outside your country of residence.</Text>

                <Text style={styles.leadText}>Such processing shall be carried out in accordance with applicable data protection laws and safeguards.</Text>

                <Text style={styles.leadText}>Where required by applicable law, such transfers or cross-border processing shall be subject to appropriate safeguards, transfer mechanisms, contractual protections, or other legally recognized measures.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('8')}>
              <Text style={styles.sectionHeader}>8. Termination, Suspension And User Actions</Text>
            </TouchableOpacity>
            {expandedSections['8'] && (
              <>
                <Text style={styles.subHeading}>8.1 User Discontinuation</Text>
                <Text style={styles.leadText}>You may choose to stop using the Platform at any time.</Text>
                <Text style={styles.leadText}>However:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• such discontinuation shall not entitle you to any refund, cancellation, or reversal of payment;</Text>
                  <Text style={styles.listItem}>• access rights already granted shall remain subject to these Terms unless terminated by the Company.</Text>
                </View>

                <Text style={styles.subHeading}>8.2 Suspension of Access</Text>
                <Text style={styles.leadText}>The Company may suspend your access to the Platform, temporarily or indefinitely, if:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• suspicious or unusual activity is detected;</Text>
                  <Text style={styles.listItem}>• technical or security concerns arise;</Text>
                  <Text style={styles.listItem}>• verification of account or usage is required;</Text>
                  <Text style={styles.listItem}>• there is a potential violation of these Terms or applicable policies.</Text>
                </View>

                <Text style={styles.leadText}>During suspension:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• access to content may be restricted;</Text>
                  <Text style={styles.listItem}>• certain features may be disabled;</Text>
                  <Text style={styles.listItem}>• verification or corrective actions may be required for restoration.</Text>
                </View>

                <Text style={styles.leadText}>The Company may also impose temporary holds, verification conditions, password resets, device re-authorization requirements, content restrictions, or other reasonable remedial measures instead of or prior to termination.</Text>

                <Text style={styles.subHeading}>8.3 Termination by the Company</Text>
                <Text style={styles.leadText}>The Company reserves the right to terminate your access to the Platform, with or without prior notice where reasonably necessary, and without refund except where required by applicable law, if:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• you violate these Terms or any applicable policy;</Text>
                  <Text style={styles.listItem}>• unauthorized use, sharing, or misuse is detected;</Text>
                  <Text style={styles.listItem}>• your actions pose a risk to the Platform, other users, or the Company;</Text>
                  <Text style={styles.listItem}>• required information or verification is not provided; or</Text>
                  <Text style={styles.listItem}>• you engage in conduct including account sharing, piracy, abuse of the reward system, or similar misuse.</Text>
                </View>
                <Text style={styles.subHeading}>8.4 Effect of Termination</Text>
                <Text style={styles.leadText}>Upon termination:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• your access to the Platform shall be immediately revoked;</Text>
                  <Text style={styles.listItem}>• any rights or licenses granted to you under these Terms shall cease;</Text>
                  <Text style={styles.listItem}>• you shall not be entitled to any refund or compensation.</Text>
                </View>

                <Text style={styles.leadText}>Termination or suspension of access does not affect any accrued rights, payment obligations, repayment obligations, compliance duties, evidentiary rights, intellectual property protections, or other provisions that by their nature are intended to survive.</Text>

                <Text style={styles.subHeading}>8.5 Survival of Provisions</Text>
                <Text style={styles.leadText}>Termination of access shall not affect the validity or enforceability of provisions which by their nature are intended to survive, including but not limited to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• intellectual property rights;</Text>
                  <Text style={styles.listItem}>• payment obligations;</Text>
                  <Text style={styles.listItem}>• disclaimers and limitation of liability;</Text>
                  <Text style={styles.listItem}>• dispute resolution and governing law provisions.</Text>
                </View>

                <Text style={styles.subHeading}>8.6 No Liability for Termination</Text>
                <Text style={styles.leadText}>Subject to Section 6 (Disclaimers and Limitation of Liability) and applicable law, the Company shall not be liable for loss, damage, inconvenience, or interruption arising from suspension, restriction, verification holds, device restrictions, or termination carried out in accordance with these Terms, applicable policies, or legal requirements.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('9')}>
              <Text style={styles.sectionHeader}>9. Governing Law And Dispute Resolution</Text>
            </TouchableOpacity>
            {expandedSections['9'] && (
              <>
                <Text style={styles.subHeading}>9.1 Governing Law</Text>
                <Text style={styles.leadText}>These Terms shall be governed by and construed in accordance with the laws of India. Subject to applicable law, courts in Durg, Chhattisgarh, India shall have jurisdiction as set out below.</Text>

                <Text style={styles.subHeading}>9.2 Jurisdiction</Text>
                <Text style={styles.leadText}>Subject to applicable laws, the courts located in Durg, Chhattisgarh, India, shall have exclusive jurisdiction over any disputes arising out of or relating to these Terms or the use of the Platform.</Text>

                <Text style={styles.subHeading}>9.3 Pre-Dispute Resolution</Text>
                <Text style={styles.leadText}>Before initiating formal legal proceedings, you agree to first contact the Company and attempt in good faith to resolve the issue informally, unless urgent interim, injunctive, consumer-protection, or other non-waivable legal relief is required.</Text>
                <Text style={styles.leadText}>You may contact us at: support@allrounderbaby.com</Text>
                <Text style={styles.leadText}>The Company shall make reasonable efforts to review and address concerns within a reasonable time.</Text>

                <Text style={styles.subHeading}>9.4 Consumer Rights and Mandatory Laws</Text>
                <Text style={styles.leadText}>Nothing in these Terms shall limit or exclude any rights that you may have under applicable laws in your jurisdiction, including mandatory consumer protection laws that cannot be waived.</Text>
                <Text style={styles.leadText}>Where such laws apply, they shall prevail over conflicting provisions of these Terms to the extent required.</Text>

                <Text style={styles.subHeading}>9.5 No Arbitration</Text>
                <Text style={styles.leadText}>Disputes shall be resolved through the competent courts as specified above.</Text>
                <Text style={styles.leadText}>No arbitration mechanism is mandated under these Terms unless required by applicable law.</Text>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('10')}>
              <Text style={styles.sectionHeader}>10. Indemnification</Text>
            </TouchableOpacity>
            {expandedSections['10'] && (
              <>
                <Text style={styles.subHeading}>10.1 User Indemnity Obligation</Text>
                <Text style={styles.leadText}>You agree to indemnify, defend, and hold harmless the Company, its directors, officers, employees, affiliates, partners, and service providers from and against any claims, demands, liabilities, damages, losses, costs, or expenses (including reasonable legal fees and expenses) arising out of or in connection with:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• your misuse of the Platform, whether intentional or negligent;</Text>
                  <Text style={styles.listItem}>• your violation of these Terms or any applicable policies;</Text>
                  <Text style={styles.listItem}>• your breach of applicable laws or regulations;</Text>
                  <Text style={styles.listItem}>• any unauthorized access to or misuse of your account attributable to you;</Text>
                  <Text style={styles.listItem}>• any false, inaccurate, or misleading information provided by you, including payout or identity details;</Text>
                  <Text style={styles.listItem}>• fraudulent, deceptive, or abusive participation in referral, feedback, or reward programs;</Text>
                  <Text style={styles.listItem}>• unauthorized sharing, distribution, reproduction, or piracy of content;</Text>
                  <Text style={styles.listItem}>• any claim arising from data, content, or information provided by you including child-related information;</Text>
                  <Text style={styles.listItem}>• any infringement of intellectual property or other rights of the Company or any third party caused by your actions.</Text>
                </View>

                <Text style={styles.leadText}>This obligation shall apply only to the extent permitted under applicable law and shall not require you to indemnify the Company for matters finally determined to have arisen primarily from the Company's own fraud, willful misconduct, or non-excludable legal liability.</Text>

                <Text style={styles.subHeading}>10.2 Third-Party and Regulatory Claims</Text>
                <Text style={styles.leadText}>This indemnification shall apply to any claims brought by:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• third parties;</Text>
                  <Text style={styles.listItem}>• regulatory or governmental authorities;</Text>
                  <Text style={styles.listItem}>• or any other person or entity,</Text>
                </View>
                <Text style={styles.leadText}>arising from your actions, omissions, or use of the Platform.</Text>
                <Text style={styles.subHeading}>10.3 Defense and Cooperation</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>The Company reserves the right to assume control of the defense and settlement of any matter subject to indemnification, at your cost to the extent the claim is properly subject to this Section and permitted by applicable law.</Text>
                <Text style={styles.leadText}>You agree to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• fully cooperate with the Company in the defense of such claims; and</Text>
                  <Text style={styles.listItem}>• provide all reasonable assistance, information, and support as required.</Text>
                </View>

                <Text style={[styles.leadText, { marginBottom: 0 }]}>The Company will provide you with reasonable notice of any indemnified claim where practicable, and any control of defense or settlement by the Company shall be exercised in a manner that does not require you to admit liability, incur non-monetary obligations, or accept prejudicial terms without your prior written consent, such consent not to be unreasonably withheld where the claim is properly subject to indemnification.</Text>

                <Text style={styles.subHeading}>10.4 Settlement Restrictions</Text>
                <Text style={styles.leadText}>You shall not settle, compromise, or resolve any claim subject to indemnification without the prior written consent of the Company.</Text>

                <Text style={styles.subHeading}>10.5 Continuing Obligation</Text>
                <Text style={styles.leadText}>Your obligations under this Section shall survive:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• termination or suspension of your account;</Text>
                  <Text style={styles.listItem}>• discontinuation of access to the Platform;</Text>
                  <Text style={styles.listItem}>• expiration of these Terms.</Text>
                </View>
              </>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('11')}>
              <Text style={styles.sectionHeader}>11. General Provisions</Text>
            </TouchableOpacity>
            {expandedSections['11'] && (
              <>
                <Text style={styles.subHeading}>11.1 Entire Agreement</Text>
                <Text style={styles.leadText}>These Terms, together with the Privacy Policy, Cookies Policy, and any other policies referenced herein, constitute the entire agreement between you and the Company regarding the use of the Platform.</Text>
                <Text style={styles.leadText}>They supersede all prior communications, understandings, or agreements, whether written or oral.</Text>

                <Text style={styles.subHeading}>11.2 Updates and Modifications</Text>
                <Text style={styles.leadText}>The Company may modify, update, or revise these Terms from time to time. The effectiveness, notice, and acceptance of such updates shall be governed by Section 1.5 of these Terms.</Text>

                <Text style={styles.subHeading}>11.3 Waiver</Text>
                <Text style={styles.leadText}>Failure by the Company to enforce any provision of these Terms shall not constitute a waiver of such provision or any other provision.</Text>
                <Text style={styles.leadText}>Any waiver shall be valid only if made in writing by the Company.</Text>

                <Text style={styles.subHeading}>11.4 Severability</Text>
                <Text style={styles.leadText}>If any provision of these Terms is held to be invalid, illegal, or unenforceable:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• such provision shall be interpreted or modified to the minimum extent necessary to make it enforceable; and</Text>
                  <Text style={styles.listItem}>• if not possible, it shall be severed.</Text>
                </View>
                <Text style={styles.leadText}>The remaining provisions shall continue in full force and effect.</Text>

                <Text style={styles.subHeading}>11.5 Assignment</Text>
                <Text style={[styles.leadText, { marginBottom: 0 }]}>The Company may assign, transfer, or delegate its rights and obligations under these Terms, in whole or in part, without restriction.</Text>
                <Text style={styles.leadText}>You may not assign, transfer, or delegate your rights or obligations, including your account, without prior written consent of the Company.</Text>
                <Text style={styles.subHeading}>11.6 Electronic Communication and Notice</Text>
                <Text style={styles.leadText}>You agree that the Company may communicate with you through:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• your registered email address;</Text>
                  <Text style={styles.listItem}>• your registered mobile number (including WhatsApp or similar platforms);</Text>
                  <Text style={styles.listItem}>• in-app notifications;</Text>
                  <Text style={styles.listItem}>• or any other contact details provided by you.</Text>
                </View>

                <Text style={styles.leadText}>Such communications shall constitute valid and legally effective notice.</Text>
                <Text style={styles.leadText}>You are responsible for keeping your contact details current and accessible. The Company is not responsible for failed delivery of notices caused by outdated, incorrect, blocked, inactive, or inaccessible contact details provided by you.</Text>

                <Text style={styles.subHeading}>11.7 Force Majeure</Text>
                <Text style={styles.leadText}>The Company shall not be liable for any failure or delay in performance resulting from events beyond its reasonable control, including but not limited to:</Text>
                <View style={styles.list}>
                  <Text style={styles.listItem}>• natural disasters;</Text>
                  <Text style={styles.listItem}>• acts of government or regulatory authorities;</Text>
                  <Text style={styles.listItem}>• war, riots, strikes, or civil disturbances;</Text>
                  <Text style={styles.listItem}>• pandemics or public health emergencies;</Text>
                  <Text style={styles.listItem}>• failure of internet, telecommunications, utilities, or third-party services.</Text>
                </View>

                <Text style={styles.subHeading}>11.8 Relationship of Parties</Text>
                <Text style={styles.leadText}>Nothing in these Terms shall be construed to create any relationship of employment, partnership, joint venture, agency, franchise, fiduciary duty, or similar relationship between you and the Company. You participate in the Platform and any Program solely as an independent user.</Text>

                <Text style={styles.subHeading}>11.9 No Third-Party Rights</Text>
                <Text style={styles.leadText}>These Terms are intended solely for the benefit of you and the Company.</Text>
                <Text style={styles.leadText}>No third party shall have any rights to enforce any provision of these Terms, except as required under applicable law.</Text>

                <Text style={styles.subHeading}>11.10 Interpretation</Text>
                <Text style={styles.leadText}>Headings and section titles are provided for convenience only and shall not affect interpretation.</Text>
                <Text style={styles.leadText}>Words such as "including" shall be interpreted as "including without limitation."</Text>
                <Text style={styles.subHeading}>11.11 Language</Text>
                <Text style={styles.leadText}>These Terms are drafted in the English language.</Text>
                <Text style={styles.leadText}>In case of any translation, the English version shall prevail, to the extent permitted by applicable law.</Text>

                <Text style={styles.subHeading}>11.12 Compliance with Laws</Text>
                <Text style={styles.leadText}>You agree to comply with all applicable laws, regulations, and guidelines while using the Platform.</Text>
                <Text style={styles.leadText}>The Company shall also operate in accordance with applicable legal and regulatory requirements.</Text>

                <Text style={styles.subHeading}>11.13 Independent Provisions</Text>
                <Text style={styles.leadText}>Each provision of these Terms operates independently.</Text>
                <Text style={styles.leadText}>If any provision is found unenforceable in one jurisdiction, it shall not affect enforceability in other jurisdictions.</Text>
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

export default TermsofServicewithoutLog;

