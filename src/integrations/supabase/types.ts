export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      avisos_globais: {
        Row: {
          ativo: boolean
          criado_em: string
          id: string
          imagem_url: string | null
          mensagem: string
          titulo: string
        }
        Insert: {
          ativo?: boolean
          criado_em?: string
          id?: string
          imagem_url?: string | null
          mensagem: string
          titulo: string
        }
        Update: {
          ativo?: boolean
          criado_em?: string
          id?: string
          imagem_url?: string | null
          mensagem?: string
          titulo?: string
        }
        Relationships: []
      }
      clientes: {
        Row: {
          bot_active: boolean
          created_at: string
          id: string
          nome: string
          numero: string
          plano: string | null
          senha: string | null
          servidor: string | null
          status: string
          teto_mensal: number
          updated_at: string
          userId: string
          usuario: string | null
          valor: number
          vencimento: string
        }
        Insert: {
          bot_active?: boolean
          created_at?: string
          id?: string
          nome: string
          numero: string
          plano?: string | null
          senha?: string | null
          servidor?: string | null
          status?: string
          teto_mensal?: number
          updated_at?: string
          userId: string
          usuario?: string | null
          valor?: number
          vencimento: string
        }
        Update: {
          bot_active?: boolean
          created_at?: string
          id?: string
          nome?: string
          numero?: string
          plano?: string | null
          senha?: string | null
          servidor?: string | null
          status?: string
          teto_mensal?: number
          updated_at?: string
          userId?: string
          usuario?: string | null
          valor?: number
          vencimento?: string
        }
        Relationships: []
      }
      cobrancas_execucoes: {
        Row: {
          created_at: string
          data: string
          detalhes: Json | null
          id: string
          status: string
        }
        Insert: {
          created_at?: string
          data: string
          detalhes?: Json | null
          id?: string
          status?: string
        }
        Update: {
          created_at?: string
          data?: string
          detalhes?: Json | null
          id?: string
          status?: string
        }
        Relationships: []
      }
      config_sistema: {
        Row: {
          chave: string
          updated_at: string
          valor: string | null
        }
        Insert: {
          chave: string
          updated_at?: string
          valor?: string | null
        }
        Update: {
          chave?: string
          updated_at?: string
          valor?: string | null
        }
        Relationships: []
      }
      configuracoes_crm: {
        Row: {
          created_at: string
          evolution_instance: string | null
          evolution_token: string | null
          evolution_url: string | null
          id: string
          nvidia_api_key: string | null
          nvidia_base_url: string
          nvidia_model: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          evolution_instance?: string | null
          evolution_token?: string | null
          evolution_url?: string | null
          id?: string
          nvidia_api_key?: string | null
          nvidia_base_url?: string
          nvidia_model?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          evolution_instance?: string | null
          evolution_token?: string | null
          evolution_url?: string | null
          id?: string
          nvidia_api_key?: string | null
          nvidia_base_url?: string
          nvidia_model?: string
          updated_at?: string
        }
        Relationships: []
      }
      devices: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          updated_at: string
          virtual_mac: string
          xtream_pass: string
          xtream_url: string
          xtream_user: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          virtual_mac: string
          xtream_pass: string
          xtream_url: string
          xtream_user: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          virtual_mac?: string
          xtream_pass?: string
          xtream_url?: string
          xtream_user?: string
        }
        Relationships: []
      }
      gastos: {
        Row: {
          cliente_id: string
          created_at: string
          data: string
          descricao: string
          id: string
          updated_at: string
          userId: string
          valor: number
        }
        Insert: {
          cliente_id: string
          created_at?: string
          data?: string
          descricao?: string
          id?: string
          updated_at?: string
          userId: string
          valor?: number
        }
        Update: {
          cliente_id?: string
          created_at?: string
          data?: string
          descricao?: string
          id?: string
          updated_at?: string
          userId?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "gastos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          cliente_id: string | null
          content: string
          created_at: string
          direction: string
          id: string
          numero: string | null
          user_id: string
        }
        Insert: {
          cliente_id?: string | null
          content: string
          created_at?: string
          direction: string
          id?: string
          numero?: string | null
          user_id: string
        }
        Update: {
          cliente_id?: string | null
          content?: string
          created_at?: string
          direction?: string
          id?: string
          numero?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          agente_ativo: boolean
          agente_prompt: string
          created_at: string
          email: string
          id: string
          instancia_liberada: boolean
          licenca_expira_em: string | null
          nome: string | null
          ultimo_acesso: string | null
          updated_at: string
          whatsapp_id: string | null
        }
        Insert: {
          agente_ativo?: boolean
          agente_prompt?: string
          created_at?: string
          email: string
          id: string
          instancia_liberada?: boolean
          licenca_expira_em?: string | null
          nome?: string | null
          ultimo_acesso?: string | null
          updated_at?: string
          whatsapp_id?: string | null
        }
        Update: {
          agente_ativo?: boolean
          agente_prompt?: string
          created_at?: string
          email?: string
          id?: string
          instancia_liberada?: boolean
          licenca_expira_em?: string | null
          nome?: string | null
          ultimo_acesso?: string | null
          updated_at?: string
          whatsapp_id?: string | null
        }
        Relationships: []
      }
      templates_cobranca: {
        Row: {
          created_at: string
          id: string
          template_antes: string
          template_depois: string
          template_hoje: string
          template_pago: string
          updated_at: string
          userId: string
        }
        Insert: {
          created_at?: string
          id?: string
          template_antes?: string
          template_depois?: string
          template_hoje?: string
          template_pago?: string
          updated_at?: string
          userId: string
        }
        Update: {
          created_at?: string
          id?: string
          template_antes?: string
          template_depois?: string
          template_hoje?: string
          template_pago?: string
          updated_at?: string
          userId?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_instances: {
        Row: {
          created_at: string
          evolution_instance_id: string | null
          id: string
          instance_name: string
          instance_token: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          evolution_instance_id?: string | null
          id?: string
          instance_name: string
          instance_token?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          evolution_instance_id?: string | null
          id?: string
          instance_name?: string
          instance_token?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      reschedule_cobrancas_diarias: {
        Args: { hora_brt: string }
        Returns: string
      }
      salvar_horario_cobrancas: { Args: { hora_brt: string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "operador"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "operador"],
    },
  },
} as const
