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
                <Text style={styles.leadText}>Unless otherwise stated, updated Terms become effective when posted on the Platform or on the effective date stated in the updated Terms.</Text>
                <Text style={styles.leText} />
                <Text style={styles.leadText}>Where required by law, or where changes are material, we may provide additional notice through the Platform, email, WhatsApp, or other appropriate communication channels.</Text>
                <Text style={styles.leadText}>Continued access to or use of the Platform after the effective date of the updated Terms constitutes your acceptance of the revised Terms.</Text>

                <Text style={styles.subHeading}>1.6 Contact Information</Text>
                <Text style={styles.leadText}>For any questions, concerns, or support requests regarding these Terms, you may contact us at:</Text>
                <Text style={styles.leadText}>Email: support@allrounderbaby.com</Text>
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
                <Text style={styles.leadText}>For clarity, the digital content provided through the Platform is considered to be supplied on a continuous and on-demand basis, and access to such content constitutes commencement of performance of the service.</Text>
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
              <><Text>gddsgdhg</Text></>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('5')}>
              <Text style={styles.sectionHeader}>5. Content, Intellectual Property And Usage Restrictions</Text>
            </TouchableOpacity>
            {expandedSections['5'] && (
              <><Text>gddsgdhg</Text></>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('6')}>
              <Text style={styles.sectionHeader}>6. Disclaimers And Limmitation Of Liability</Text>
            </TouchableOpacity>
            {expandedSections['6'] && (
              <><Text>gddsgdhg</Text></>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('7')}>
              <Text style={styles.sectionHeader}>7. Privacy, Data And User Information</Text>
            </TouchableOpacity>
            {expandedSections['7'] && (
              <><Text>gddsgdhg</Text></>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('8')}>
              <Text style={styles.sectionHeader}>8. Termination, Suspension And User Actions</Text>
            </TouchableOpacity>
            {expandedSections['8'] && (
              <><Text>gddsgdhg</Text></>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('9')}>
              <Text style={styles.sectionHeader}>9. Governing Law And Dispute Resolution</Text>
            </TouchableOpacity>
            {expandedSections['9'] && (
              <><Text>gddsgdhg</Text></>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('10')}>
              <Text style={styles.sectionHeader}>10. Indemnification</Text>
            </TouchableOpacity>
            {expandedSections['10'] && (
              <><Text>gddsgdhg</Text></>
            )}
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => toggleSection('11')}>
              <Text style={styles.sectionHeader}>11. General Provisions</Text>
            </TouchableOpacity>
            {expandedSections['11'] && (
              <><Text>gddsgdhg</Text></>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
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
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 15,
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
    padding: 12,
    borderRadius: 8,
    margin: 12,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    color: '#1434a4',
    paddingHorizontal: 10,
    marginBottom: 6,
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
    borderRadius: 8,
    marginVertical: 8,
  },
  addressText: {
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

