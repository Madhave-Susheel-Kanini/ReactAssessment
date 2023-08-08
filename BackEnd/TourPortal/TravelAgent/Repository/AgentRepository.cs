using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repository
{
    public class AgentRepository:IAgent
    {
        private readonly AgentContext _Context;
        public AgentRepository(AgentContext con)
        {
            _Context = con;
        }
        public IEnumerable<Agent> GetAgent()
        {
            return _Context.TravelAgents.ToList();
        }
        public Agent GetAgentsById(int id)
        {
            return _Context.TravelAgents.FirstOrDefault(x => x.travelAgentId == id);
        }
        public Agent PostAgents(Agent agent)
        {
            _Context.Add(agent);
            _Context.SaveChanges();
            return agent;
        }
        public Agent PutAgent(int id, Agent agent)
        {
            if (id != agent.travelAgentId)
            {
                throw new ArgumentException("Course ID mismatch");
            }
        
            _Context.Entry(agent).State = EntityState.Modified;
            _Context.SaveChanges();
            return agent;
        }

        public Agent DeleteAgent(int id)
        {

            var agent = _Context.TravelAgents.Find(id);


            _Context.TravelAgents.Remove(agent);
            _Context.SaveChanges();

            return agent;
        }
    }
}
