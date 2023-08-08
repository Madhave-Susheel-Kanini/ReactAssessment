using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelAgent.Models;
using TravelAgent.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace TravelAgent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
 
    public class AgentsController : ControllerBase
    {
        private readonly IAgent _agentRepository;

        public AgentsController(IAgent agentRepository)
        {
            _agentRepository = agentRepository;
        }

        // GET: api/Agents
        [HttpGet]
        public IEnumerable<Agent> GetAgents()
        {
            return _agentRepository.GetAgent();
        }

        // GET: api/Agents/5
        [HttpGet("{id}")]
        public ActionResult<Agent> GetAgent(int id)
        {
            var agent = _agentRepository.GetAgentsById(id);
            if (agent == null)
            {
                return NotFound();
            }
            return agent;
        }

        // POST: api/Agents
        [HttpPost]
        public ActionResult<Agent> PostAgent(Agent agent)
        {
            try
            {
                var newAgent = _agentRepository.PostAgents(agent);
                return CreatedAtAction(nameof(GetAgent), new { id = newAgent.travelAgentId }, newAgent);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating the agent.");
            }
        }

        // PUT: api/Agents/5
        [HttpPut("{id}")]
        public IActionResult PutAgent(int id, Agent agent)
        {
            var updatedAgent = _agentRepository.PutAgent(id, agent);
            return Ok(updatedAgent);
        }

        // DELETE: api/Agents/5
        [HttpDelete("{id}")]
        public ActionResult<Agent> DeleteAgent(int id)
        {
            var agent = _agentRepository.DeleteAgent(id);
            if (agent == null)
            {
                return NotFound();
            }
            return agent;
        }
    }
}
