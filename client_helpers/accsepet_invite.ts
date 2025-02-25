 export async function accsepetInvite() {
    try {
      const response = await fetch('/api/invite/get', {
        method: 'GET',
        credentials: 'same-origin', // تأكد من إرسال الـ cookies مع الطلب
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the invite');
      }
  
      const data = await response.json();
      
      if (data.error) {
        console.error('Error:', data.error);
        return { success: false, message: data.error };
      }
  
      if (data.invite) {
        console.log('Invite JWT:', data.invite);
        return { success: true, invite: data.invite };
      }
  
      return { success: false, message: 'Unknown error' };
  
    } catch (error) {
      console.error('Error during fetch:', error);
      return { success: false, message: 'Something went wrong' };
    }
  }
  