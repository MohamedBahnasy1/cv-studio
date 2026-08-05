<script lang="ts">
  import type { ResumeData } from "$lib/types";
  
  let { data }: { data: ResumeData } = $props();
</script>

<div class="resume-template1">
  <img src={data.personal.photo} alt="" />
  <h1>{data.personal.fullName}</h1>
  <p>{data.personal.title}</p>
  <p>{data.personal.email}</p>
  <p>{data.personal.phone}</p>
  <p>{data.personal.address}</p>
  <p>{data.personal.dob}</p>
  <p>{data.personal.nationality}</p>
  <p>{data.profile}</p>
  {#each data.experience as item}
    <p>{item.jobTitle}</p>
    <p>{item.company}</p>
    <p>{item.location}</p>
    <p>{item.from}</p>
    <p>{item.to}</p>
    <p>{item.description}</p>
  {/each}
  {#each data.education as item}
    <p>{item.degree}</p>
    <p>{item.institution}</p>
    <p>{item.location}</p>
    <p>{item.from}</p>
    <p>{item.to}</p>
    <p>{item.grade}</p>
  {/each}
  {#each data.skills as item}
    <p>{item.category}</p>
    {#each item.items as skillItem}
      <p>{skillItem.name}</p>
      <p>{skillItem.level}</p>
    {/each}
  {/each}
  {#each data.languages as item}
    <p>{item.name}</p>
    <p>{item.level}</p>
  {/each}
</div>