 export async function accsepetInvite(team_id:string|number) {
    try {
      const response = await fetch('/api/invite/get', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({"team_id":team_id}) // تأكد من إرسال الـ cookies مع الطلب
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
        return { success: true, invite: data.invite };
      }
  
      return { success: false, message: 'Unknown error' };
  
    } catch (error) {
      console.error('Error during fetch:', error);
      return { success: false, message: 'Something went wrong' };
    }
  }


// Assuming the use of fetch API with await
export async function checkInvite(invite_jwt_string:string) {
  try {
    // Send request to your endpoint
    const response = await fetch('/api/invite/accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invite_jwt: invite_jwt_string }),
    });

    // Check if the request was successful
    if (!response.ok) {
      return { success: false }; // Return false if the response is not successful
    }

    // Parse the response body
    const responseData = await response.json();

    // If the response has a team_id, then return success with team_id
    if (responseData.team_id) {
      return { success: true, team_id: responseData.team_id ,team_name:responseData.team_name};
    } else {
      return { success: false }; // Return false if no team_id is found
    }
  } catch (error) {
    // Catch any error that occurred during the fetch process
    console.error('Error fetching team data:', error);
    return { success: false }; // Return false in case of error
  }
}

  