#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod plutus {
    use super::*;

  pub fn close(_ctx: Context<ClosePlutus>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.plutus.count = ctx.accounts.plutus.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.plutus.count = ctx.accounts.plutus.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializePlutus>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.plutus.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializePlutus<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Plutus::INIT_SPACE,
  payer = payer
  )]
  pub plutus: Account<'info, Plutus>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct ClosePlutus<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub plutus: Account<'info, Plutus>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub plutus: Account<'info, Plutus>,
}

#[account]
#[derive(InitSpace)]
pub struct Plutus {
  count: u8,
}
