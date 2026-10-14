import { useEffect, useState } from "react";
import { Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import api from "@/lib/axiosInstance";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const defaultForm = {
  company_name: "Chitra Crop Science",
  address: "",
  phone: "",
  email: "",
  whatsapp: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  seo_title: "",
  seo_description: "",
  logo: null as File | null,
};

export default function SettingsAdmin() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [settingsId, setSettingsId] = useState<number | null>(null);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get("/settings/");
      if (response.data.results && response.data.results.length > 0) {
        const data = response.data.results[0];
        setSettingsId(data.id);
        setForm({
          company_name: data.company_name || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          whatsapp: data.whatsapp || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          linkedin: data.linkedin || "",
          seo_title: data.seo_title || "",
          seo_description: data.seo_description || "",
          logo: null,
        });
        setPreviewUrl(data.logo || "");
      }
    } catch (error) {
      toast.error("Could not load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleFieldChange = (key: keyof typeof defaultForm, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFieldChange("logo", file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== "logo") {
          formData.append(key, String(value));
        }
      });
      if (form.logo) {
        formData.append("logo", form.logo);
      }

      if (settingsId) {
        await api.patch(`/settings/${settingsId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/settings/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      toast.success("Settings saved successfully");
      await loadSettings();
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-500 p-8">Loading settings...</div>;
  }

  return (
    <section>
      <AdminPageHeader
        title="Global Settings"
        description="Configure your business information, contact details, social links, and SEO defaults."
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        <div className="space-y-6">
          <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Company Details</h3>
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={form.company_name}
                  onChange={(e) => handleFieldChange("company_name", e.target.value)}
                  className="max-w-md mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  value={form.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact & Social</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={form.whatsapp}
                    onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Public Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input
                    id="facebook"
                    value={form.facebook}
                    onChange={(e) => handleFieldChange("facebook", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    value={form.instagram}
                    onChange={(e) => handleFieldChange("instagram", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={form.linkedin}
                    onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">SEO Defaults</h3>
              <div>
                <Label htmlFor="seo_title">Default Meta Title</Label>
                <Input
                  id="seo_title"
                  value={form.seo_title}
                  onChange={(e) => handleFieldChange("seo_title", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="seo_description">Default Meta Description</Label>
                <Textarea
                  id="seo_description"
                  value={form.seo_description}
                  onChange={(e) => handleFieldChange("seo_description", e.target.value)}
                  rows={2}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl border border-green-100 bg-white shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Brand Logo</h3>
              
              <div className="mt-2 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                {previewUrl ? (
                  <img src={previewUrl} alt="Logo" className="max-w-full h-auto max-h-32 object-contain" />
                ) : (
                  <Upload className="h-8 w-8 text-slate-400" />
                )}
                
                <label className="cursor-pointer mt-4">
                  <Button variant="outline" asChild>
                    <span>Change Logo</span>
                  </Button>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-green-100 bg-emerald-50 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-emerald-800 mb-2">Save Changes</h3>
              <p className="text-xs text-emerald-600 mb-4">
                Update the global settings for your public website. These changes will be reflected immediately.
              </p>
              <Button type="submit" className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700" disabled={saving}>
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Settings"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </section>
  );
}
