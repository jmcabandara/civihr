<script id="hrjob-general-template" type="text/template">

  <div class="crm-summary-row">
    <div class="crm-label">
      <label for="hrjob-position">{ts}Position{/ts}</label>
    </div>
    <div class="crm-content">
      <input id="hrjob-position" name="position" class="form-text-big" type="text" />
    </div>
  </div>

  <div class="crm-summary-row">
    <div class="crm-label">
      <label for="hrjob-title">{ts}Title{/ts}</label>
    </div>
    <div class="crm-content">
      <input id="hrjob-title" name="title" class="form-text-big" type="text" />
    </div>
  </div>

  <div class="crm-summary-row">
    <div class="crm-label">
      <label for="hrjob-contract_type">{ts}Contract Type{/ts}</label>
    </div>
    <div class="crm-content">
    {literal}
      <%= RenderUtil.select({
        id: 'hrjob-contract_type',
        name: 'contract_type',
        selected: contract_type,
        options: _.extend({'':''}, FieldOptions.contract_type)
      }) %>
    {/literal}
    </div>
  </div>

  <div class="crm-summary-row">
    <div class="crm-label">
      <label for="hrjob-level_type">{ts}Level{/ts}</label>
    </div>
    <div class="crm-content">
    {literal}
      <%= RenderUtil.select({
        id: 'hrjob-level_type',
        name: 'level_type',
        selected: level_type,
        options: _.extend({'':''}, FieldOptions.level_type)
      }) %>
    {/literal}
    </div>
  </div>

  <div class="crm-summary-row">
    <div class="crm-label">
      <label for="hrjob-period_type">{ts}Time Period{/ts}</label>
    </div>
    <div class="crm-content">
    {literal}
      <%= RenderUtil.select({
        id: 'hrjob-period_type',
        name: 'period_type',
        selected: period_type,
        options: _.extend({'':''}, FieldOptions.period_type)
      }) %>
    {/literal}
    </div>
  </div>

  <div class="crm-summary-row">
    <div class="crm-label">
      <label for="hrjob-period_start_date">{ts}Start Date{/ts}</label>
    </div>
    <div class="crm-content">
      <input id="hrjob-period_start_date" name="period_start_date" class="form-text-big" type="text" />
    </div>
  </div>

  <div class="crm-summary-row">
    <div class="crm-label">
      <label for="hrjob-period_end_date">{ts}End Date{/ts}</label>
    </div>
    <div class="crm-content">
      <input id="hrjob-period_end_date" name="period_end_date" class="form-text-big" type="text" />
    </div>
  </div>

  <div class="crm-summary-row">
    <div class="crm-label">
      <label for="hrjob-manager_contact_id">{ts}Manager{/ts}</label>
    </div>
    <div class="crm-content">
      <input id="hrjob-manager_contact_id" name="manager_contact_id" class="form-text-big" type="text" />
    </div>
  </div>
</script>
