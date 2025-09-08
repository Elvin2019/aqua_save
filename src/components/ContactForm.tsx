import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SendIcon from '@mui/icons-material/Send';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.validation.subjectRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          mx: 'auto',
          width: '100%'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <ContactMailIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
          >
            {t('contact.title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            {t('contact.subtitle')}
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 3 
                }}>
                  <TextField
                    fullWidth
                    label={t('contact.name')}
                    value={formData.name}
                    onChange={handleChange('name')}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                  <TextField
                    fullWidth
                    label={t('contact.email')}
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Box>

                <TextField
                  fullWidth
                  label={t('contact.subject')}
                  value={formData.subject}
                  onChange={handleChange('subject')}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  required
                />

                <TextField
                  fullWidth
                  label={t('contact.message')}
                  multiline
                  rows={6}
                  value={formData.message}
                  onChange={handleChange('message')}
                  error={!!errors.message}
                  helperText={errors.message}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={<SendIcon />}
                  sx={{
                    alignSelf: 'flex-start',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
            {t('contact.successMessage')}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContactForm;
