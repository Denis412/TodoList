interface Chat {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface CreateChatInput {
  name: string;
}

type UpdateChatInput = Partial<CreateChatInput>;
