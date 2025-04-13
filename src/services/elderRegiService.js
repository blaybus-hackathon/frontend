export const elderRegiService = {
  async submitElderData(data) {
    try {
      const elderData = { ...data };

      if (data.profileImage) {
        elderData.profileImage = data.profileImage;
      }

      const response = await fetch('/api/patient/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(elderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit elder data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting elder data:', error);
      throw error;
    }
  },
};
