async function fetchTeams() {
    try {
      const response = await fetch('/api/teams/getAdminTeams'); 
  
      if (!response.ok) {
        return {
          success: false,
          teams: [],
        };
      }
  
      const data = await response.json();
  
      return {
        success: true,
        teams: data.teams || [], // حسب شكل الاستجابة
      };
    } catch (error) {
      console.error('Error fetching teams:', error);
      return {
        success: false,
        teams: [],
      };
    }
  }

  export default fetchTeams;        
  