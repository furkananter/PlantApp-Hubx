import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyledText } from '@/components/common/StyledText';
import { Collapsible } from '@/components/common/Collapsible';
import Btn from '@/components/common/buttons/Btn';
import { Colors } from '@/constants/Colors';

const HelpScreen = () => {
  const { t } = useTranslation();

  const faqs =
    (t('settings.help.faqs', { returnObjects: true }) as {
      question: string;
      answer: string;
    }[]) || [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <StyledText style={styles.header}>
          {t('settings.help.title')}
        </StyledText>
        <StyledText style={styles.description}>
          {t('settings.help.description')}
        </StyledText>

        {faqs.length > 0 &&
          faqs.map((faq, index) => (
            <View key={index} style={styles.faqContainer}>
              <Collapsible title={faq.question}>
                <StyledText style={styles.answer}>{faq.answer}</StyledText>
              </Collapsible>
            </View>
          ))}

        <Btn style={styles.button} onPress={() => {}} color={Colors.primary}>
          <StyledText style={styles.buttonText}>
            {t('settings.help.contactSupport')}
          </StyledText>
        </Btn>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  faqContainer: {
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    marginTop: 32,
    padding: 16,

    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default HelpScreen;
