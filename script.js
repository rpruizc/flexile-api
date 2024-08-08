// script.js
async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    renderTasks(tasks);
  }
  
  function renderTasks(tasks) {
    const tasksBody = document.getElementById('tasks-body');
    tasksBody.innerHTML = '';
  
    const totals = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0
    };
  
    if (tasks.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = `
        <td colspan="9" class="p-4 text-gray-500">No tasks added yet.</td>
      `;
      tasksBody.appendChild(emptyRow);
    } else {
      tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.className = "hover:bg-gray-100";
        row.innerHTML = `
          <td class="p-2"><input type="text" value="${task.name}" placeholder="Task name" class="w-full p-2 border rounded"></td>
          <td class="p-2"><input type="text" value="${task.durations['Mon'] || ''}" placeholder="HH:MM:SS" class="w-full p-2 border rounded"></td>
          <td class="p-2"><input type="text" value="${task.durations['Tue'] || ''}" placeholder="HH:MM:SS" class="w-full p-2 border rounded"></td>
          <td class="p-2"><input type="text" value="${task.durations['Wed'] || ''}" placeholder="HH:MM:SS" class="w-full p-2 border rounded"></td>
          <td class="p-2"><input type="text" value="${task.durations['Thu'] || ''}" placeholder="HH:MM:SS" class="w-full p-2 border rounded"></td>
          <td class="p-2"><input type="text" value="${task.durations['Fri'] || ''}" placeholder="HH:MM:SS" class="w-full p-2 border rounded"></td>
          <td class="p-2"><input type="text" value="${task.durations['Sat'] || ''}" placeholder="HH:MM:SS" class="w-full p-2 border rounded"></td>
          <td class="p-2"><input type="text" value="${task.durations['Sun'] || ''}" placeholder="HH:MM:SS" class="w-full p-2 border rounded"></td>
          <td class="p-2">
            <button onclick="deleteTask(${task.id})" class="text-red-500 hover:text-red-700">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;
        tasksBody.appendChild(row);
  
        // Update totals
        for (const day in task.durations) {
          const timeParts = task.durations[day].split(':').map(Number);
          const timeInSeconds = (timeParts[0] * 3600) + (timeParts[1] * 60) + (timeParts[2] || 0);
          totals[day] += timeInSeconds;
        }
      });
    }
  
    // Update total times for each day
    for (const day in totals) {
      document.getElementById(`total-${day.toLowerCase()}`).innerText = formatTime(totals[day]);
    }
  }
  
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  async function deleteTask(taskId) {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId })
      });
  
      if (response.ok) {
        fetchTasks(); // Refresh the tasks after deletion
      } else {
        alert('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  }
  
  // Listen for Server-Sent Events (SSE)
  const eventSource = new EventSource('http://localhost:3000/events');
  eventSource.onmessage = function(event) {
    if (event.data === 'update') {
      fetchTasks(); // Refresh the tasks when the server notifies an update
    }
  };
  
  document.addEventListener('DOMContentLoaded', fetchTasks);
  