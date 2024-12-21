export const mockMessages = [
  {
    id: 'msg-1',
    sender: 'Dr. Sarah Johnson',
    content: 'Hello Mr. Smith, how are you feeling today?',
    timestamp: new Date('2024-03-18T14:30:00'),
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'msg-2',
    sender: 'John Smith',
    content: 'Hi Dr. Johnson, I\'ve been experiencing some sensitivity in my upper right molar, especially when drinking cold beverages.',
    timestamp: new Date('2024-03-18T14:31:00')
  },
  {
    id: 'msg-3',
    sender: 'Dr. Sarah Johnson',
    content: 'I understand. Can you point to the specific tooth using the diagram I\'m sharing?',
    timestamp: new Date('2024-03-18T14:32:00'),
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'msg-4',
    sender: 'John Smith',
    content: 'Yes, it\'s tooth number 3, the second molar from the back.',
    timestamp: new Date('2024-03-18T14:33:00')
  }
];

export const mockSession = {
  id: 'session-1',
  appointmentId: 'apt-1',
  patientId: 'pat-1',
  dentistId: 'usr-d1',
  status: 'waiting' as const,
  notes: 'Initial consultation for tooth sensitivity',
  startTime: new Date().toISOString()
};