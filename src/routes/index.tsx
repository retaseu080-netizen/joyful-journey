import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2, MonitorPlay, Radio, Trash2, Tv } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gerenciador RFlow Cine Pró | Ativação de Dispositivos" },
      {
        name: "description",
        content:
          "Ative e gerencie dispositivos IPTV vinculando o MAC virtual a uma lista Xtream Codes.",
      },
      { property: "og:title", content: "Gerenciador RFlow Cine Pró" },
      {
        property: "og:description",
        content: "Ative e gerencie dispositivos IPTV vinculados a listas Xtream Codes.",
      },
    ],
  }),
  component: Index,
});

const deviceSchema = z.object({
  virtual_mac: z
    .string()
    .trim()
    .min(5, "Informe o MAC do dispositivo")
    .max(32, "MAC muito longo"),
  xtream_url: z
    .string()
    .trim()
    .url("Informe uma URL válida (ex: http://servidor.com:8080)")
    .max(255),
  xtream_user: z.string().trim().min(1, "Informe o usuário").max(120),
  xtream_pass: z.string().trim().min(1, "Informe a senha").max(120),
});

type Device = {
  id: string;
  virtual_mac: string;
  xtream_url: string;
  xtream_user: string;
  is_active: boolean;
  created_at: string;
};

const emptyForm = { virtual_mac: "", xtream_url: "", xtream_user: "", xtream_pass: "" };

function Index() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);

  const { data: devices = [], isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: async (): Promise<Device[]> => {
      const { data, error } = await supabase
        .from("devices")
        .select("id, virtual_mac, xtream_url, xtream_user, is_active, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["devices"] });

  const createDevice = useMutation({
    mutationFn: async (values: z.infer<typeof deviceSchema>) => {
      const { error } = await supabase.from("devices").insert(values);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Dispositivo ativado com sucesso!");
      setForm(emptyForm);
      invalidate();
    },
    onError: (error: { message?: string }) =>
      toast.error(
        error?.message?.includes("duplicate")
          ? "Este MAC já está cadastrado."
          : "Não foi possível ativar o dispositivo.",
      ),
  });

  const toggleDevice = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("devices").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status atualizado.");
      invalidate();
    },
    onError: () => toast.error("Não foi possível atualizar o status."),
  });

  const deleteDevice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("devices").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Dispositivo removido.");
      invalidate();
    },
    onError: () => toast.error("Não foi possível remover o dispositivo."),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = deviceSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    createDevice.mutate(parsed.data);
  };

  const total = devices.length;
  const ativos = devices.filter((d) => d.is_active).length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-5">
          <div className="gradient-brand flex h-10 w-10 items-center justify-center rounded-xl">
            <MonitorPlay className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-gradient-brand text-xl font-bold tracking-tight sm:text-2xl">
              RFlow Cine Pró
            </h1>
            <p className="text-xs text-muted-foreground">Gerenciador de dispositivos IPTV</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <section className="grid gap-4 sm:grid-cols-2">
          <StatCard
            icon={<Tv className="h-5 w-5 text-primary" />}
            label="Total de Dispositivos"
            value={total}
          />
          <StatCard
            icon={<Radio className="h-5 w-5 text-accent" />}
            label="Dispositivos Ativos"
            value={ativos}
          />
        </section>

        <section className="glass-card rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-semibold">Ativar novo dispositivo</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Vincule o MAC virtual gerado na TV a uma lista Xtream Codes.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field
              id="virtual_mac"
              label="MAC do Dispositivo"
              placeholder="RF:1A:2B:3C:4D:5E"
              value={form.virtual_mac}
              onChange={(v) => setForm({ ...form, virtual_mac: v.toUpperCase() })}
            />
            <Field
              id="xtream_url"
              label="URL do Servidor"
              placeholder="http://servidor.com:8080"
              value={form.xtream_url}
              onChange={(v) => setForm({ ...form, xtream_url: v })}
            />
            <Field
              id="xtream_user"
              label="Usuário"
              placeholder="usuario123"
              value={form.xtream_user}
              onChange={(v) => setForm({ ...form, xtream_user: v })}
            />
            <Field
              id="xtream_pass"
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={form.xtream_pass}
              onChange={(v) => setForm({ ...form, xtream_pass: v })}
            />

            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={createDevice.isPending}
                className="gradient-brand w-full rounded-xl border-0 font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-10"
              >
                {createDevice.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Ativar Dispositivo
              </Button>
            </div>
          </form>
        </section>

        <section className="glass-card overflow-hidden rounded-2xl shadow-2xl">
          <div className="p-6 pb-2">
            <h2 className="text-lg font-semibold">Dispositivos cadastrados</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>MAC</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                      Carregando...
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && devices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                      Nenhum dispositivo cadastrado ainda.
                    </TableCell>
                  </TableRow>
                )}
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-mono text-sm text-primary">
                      {device.virtual_mac}
                    </TableCell>
                    <TableCell className="max-w-[240px] truncate text-sm text-muted-foreground">
                      {device.xtream_url}
                    </TableCell>
                    <TableCell>
                      {device.is_active ? (
                        <Badge className="border-0 bg-success text-success-foreground">Ativo</Badge>
                      ) : (
                        <Badge variant="destructive" className="border-0">
                          Inativo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-3">
                        <Switch
                          checked={device.is_active}
                          aria-label="Ativar ou desativar dispositivo"
                          onCheckedChange={(checked) =>
                            toggleDevice.mutate({ id: device.id, is_active: checked })
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Excluir dispositivo"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => deleteDevice.mutate(device.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="glass-card flex items-center gap-4 rounded-2xl p-5 shadow-xl">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/60">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={255}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl bg-background/40"
      />
    </div>
  );
}
