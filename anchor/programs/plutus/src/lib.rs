#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;
const ANCHOR_DISCRIMINATOR: usize = 8;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod plutus {
    use super::*;

    pub fn approve(ctx: Context<Approve>, amount: u64) -> Result<()> {
        let approval_account = &mut ctx.accounts.approval;
        approval_account.amount = amount;
        approval_account.user = ctx.accounts.user.key();
        approval_account.authority = ctx.accounts.authority_pda.key();
        approval_account.nonce = Clock::get()?.unix_timestamp;

        Ok(())
    }

    pub fn revoke(ctx: Context<Revoke>) -> Result<()> {
        let approval_account = &mut ctx.accounts.approval;

        // Only the original user can revoke
        require!(
            ctx.accounts.user.is_signer || ctx.accounts.authority_pda.is_signer,
            CustomError::Unauthorized
        );

        approval_account.amount = 0;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Approve<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
      init,
      payer = user,
      space = ANCHOR_DISCRIMINATOR + Approval::INIT_SPACE,
    )]
    pub approval: Account<'info, Approval>,

    #[account(
      seeds = [user.key().as_ref(), b"plutus_trade_pda"] ,
      bump
    )]
    pub authority_pda: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Revoke<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
      mut,
      close = user
    )]
    pub approval: Account<'info, Approval>,

    #[account(
      seeds = [user.key().as_ref(), b"plutus_trade_pda"],
      bump,
      signer
  )]
    pub authority_pda: UncheckedAccount<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct Approval {
    pub user: Pubkey,
    pub amount: u64,
    pub authority: Pubkey,
    pub nonce: i64,
}

#[error_code]
pub enum CustomError {
    #[msg("Insufficient approval amount.")]
    InsufficientApproval,
    #[msg("Invalid nonce detected.")]
    InvalidNonce,
    #[msg("Unauthorized access.")]
    Unauthorized,
}
