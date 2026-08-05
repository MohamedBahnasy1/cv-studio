<script lang="ts">
    import EducationForm from "$lib/components/EducationForm.svelte";
    import ExperienceForm from "$lib/components/ExperienceForm.svelte";
    import PersonalInfoForm from "$lib/components/PersonalInfoForm.svelte";
    import ProfileForm from "$lib/components/ProfileForm.svelte";
    import SkillsForm from "$lib/components/SkillsForm.svelte";
    import Template1 from "$lib/components/templates/Template1.svelte";
    import { resume } from "$lib/store";
  import { Button } from "$lib/components/ui/button/index.js"
</script>
<div class="app-grid">
  <aside class="form-panel" dir="rtl">
    <PersonalInfoForm />
    <ProfileForm />
    <ExperienceForm />
    <EducationForm />
    <SkillsForm />
  </aside>

  <main class="preview-panel">
    <div class="print-area">
      <Template1 data={$resume} />
    </div>
    <Button onclick={() => window.print()}>طباعة PDF</Button>
  </main>
</div>

<style>
  .app-grid {
    display: grid;
    grid-template-columns: 420px 1fr;
    height: 100vh;
  }
  .form-panel { overflow-y: auto; padding: 1.5rem; }
  .preview-panel { overflow-y: auto; background: #f3f4f6; padding: 2rem; }
  @media (max-width: 900px) {
    .app-grid { grid-template-columns: 1fr; }
  }
</style>