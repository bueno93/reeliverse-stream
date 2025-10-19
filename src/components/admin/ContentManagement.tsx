import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Content {
  id: string;
  title: string;
  description: string;
  image_url: string;
  trailer_url: string;
  type: string;
  category_id: string;
  rating: number;
  duration_minutes: number;
  release_year: number;
  min_plan: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export const ContentManagement = () => {
  const { toast } = useToast();
  const [contents, setContents] = useState<Content[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    trailer_url: "",
    type: "movie" as "movie" | "series",
    category_id: "",
    rating: 0,
    duration_minutes: 0,
    release_year: new Date().getFullYear(),
    min_plan: "basic" as "basic" | "premium" | "standard",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [{ data: contentsData }, { data: categoriesData }] = await Promise.all([
      supabase.from("contents").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("name"),
    ]);

    if (contentsData) setContents(contentsData);
    if (categoriesData) setCategories(categoriesData);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      trailer_url: "",
      type: "movie",
      category_id: "",
      rating: 0,
      duration_minutes: 0,
      release_year: new Date().getFullYear(),
      min_plan: "basic",
    });
    setEditingContent(null);
    setImageFile(null);
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('content-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Erro ao fazer upload da imagem",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload image if file selected
      if (imageFile) {
        const uploadedUrl = await handleImageUpload(imageFile);
        if (!uploadedUrl) {
          setLoading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      const submitData = {
        ...formData,
        image_url: imageUrl,
        rating: formData.rating || 0,
        duration_minutes: formData.duration_minutes || 0,
      };

      if (editingContent) {
        const { error } = await supabase
          .from("contents")
          .update(submitData)
          .eq("id", editingContent.id);

        if (error) throw error;
        toast({ title: "Conteúdo atualizado com sucesso!" });
      } else {
        const { error } = await supabase.from("contents").insert([submitData]);
        if (error) throw error;
        toast({ title: "Conteúdo adicionado com sucesso!" });
      }

      resetForm();
      setIsDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar conteúdo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      description: content.description || "",
      image_url: content.image_url || "",
      trailer_url: content.trailer_url || "",
      type: content.type as "movie" | "series",
      category_id: content.category_id || "",
      rating: content.rating || 0,
      duration_minutes: content.duration_minutes || 0,
      release_year: content.release_year || new Date().getFullYear(),
      min_plan: content.min_plan as "basic" | "premium" | "standard",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este conteúdo?")) return;

    try {
      const { error } = await supabase.from("contents").delete().eq("id", id);
      if (error) throw error;
      
      toast({ title: "Conteúdo excluído com sucesso!" });
      loadData();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir conteúdo",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Conteúdo</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Conteúdo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingContent ? "Editar Conteúdo" : "Adicionar Novo Conteúdo"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "movie" | "series") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="movie">Filme</SelectItem>
                      <SelectItem value="series">Série</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rating">Avaliação (0-10)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duração (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="year">Ano</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.release_year}
                    onChange={(e) =>
                      setFormData({ ...formData, release_year: parseInt(e.target.value) || new Date().getFullYear() })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="min_plan">Plano Mínimo</Label>
                <Select
                  value={formData.min_plan}
                  onValueChange={(value: "basic" | "premium" | "standard") =>
                    setFormData({ ...formData, min_plan: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="standard">Padrão</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="trailer_url">Link do Trailer (YouTube/Vimeo)</Label>
                <Input
                  id="trailer_url"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.trailer_url}
                  onChange={(e) => setFormData({ ...formData, trailer_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Imagem do Conteúdo</Label>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="image_file" className="text-sm text-muted-foreground">
                      Upload de arquivo
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="image_file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setImageFile(e.target.files?.[0] || null);
                          if (e.target.files?.[0]) {
                            setFormData({ ...formData, image_url: "" });
                          }
                        }}
                        disabled={!!formData.image_url}
                        className="flex-1"
                      />
                      {imageFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setImageFile(null)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        ou
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image_url" className="text-sm text-muted-foreground">
                      Link da imagem
                    </Label>
                    <Input
                      id="image_url"
                      type="url"
                      placeholder="https://exemplo.com/imagem.jpg"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({ ...formData, image_url: e.target.value });
                        if (e.target.value) {
                          setImageFile(null);
                        }
                      }}
                      disabled={!!imageFile}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(false);
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || uploading} 
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : loading ? (
                    "Salvando..."
                  ) : editingContent ? (
                    "Atualizar"
                  ) : (
                    "Adicionar"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Plano Mínimo</TableHead>
            <TableHead>Nota</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.map((content) => (
            <TableRow key={content.id}>
              <TableCell className="font-medium">{content.title}</TableCell>
              <TableCell>{content.type === "movie" ? "Filme" : "Série"}</TableCell>
              <TableCell className="capitalize">{content.min_plan}</TableCell>
              <TableCell>{content.rating}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(content)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(content.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
