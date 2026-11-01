const form = document.getElementById('bookingForm');
const message = document.getElementById('formMessage');

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Отправляем...';
  message.textContent = '';

  const data = {
    name: form.elements.name.value.trim(),
    phone: form.elements.phone.value.trim(),
    program: form.elements.program.value,
    preferredTime: form.elements.preferredTime.value.trim(),
    childAge: form.elements.childAge.value.trim(),
    comment: form.elements.comment.value.trim(),
    consent: form.elements.consent.checked
  };

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Не удалось отправить заявку');
    }

    message.textContent = 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами для подтверждения записи.';
    form.reset();
  } catch (error) {
    message.textContent = 'Не удалось отправить заявку. Попробуйте позже или свяжитесь с нами.';
  } finally {
    button.disabled = false;
    button.textContent = 'Отправить заявку';
  }
});
